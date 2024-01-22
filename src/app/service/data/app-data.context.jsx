import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "../authentication/authentication.context";
import {
  requestSseAuthentication,
  requestUserInformation,
  requestWidgetInformation,
} from "./app-data.service";

import { ModalState } from "../modals/modals.context";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const { user, user_register, user_hash, setUserCurrentPlan, setHash } =
    UserAuth();

  const { setModalOpen, setModalErrorMode, setModalMsg } = ModalState();

  const [visitors_array, setVisitorsArray] = useState(null);
  const [notification_array, setNotificationArray] = useState([]);
  const [seen_notification_array, setSeenNotificationArray] = useState([]);
  const [analytics_data_array, setAnalyticsDataArray] = useState({});
  const [sse_link, setSSELink] = useState("");
  const [event_source, setEventSource] = useState("");
  const [ws_link, setWSLink] = useState("");
  const [mute_notification_sound, setMuteNotifSound] = useState(false); // state
  const [widget_connected_status, setWidgetConnectedStatus] = useState(false); // state
  const [widget_customizations, setCustomizationObj] = useState({}); // state

  const fetchInfo = async (user_id) => {
    if (user_id !== "undefined" && user_id) {
      try {
        // response to get the user account info from the DB
        const response = await requestUserInformation(user_id);
        console.log("User: ", response);
        // set the data to connect SSE etc.
        AuthSSEconnect(user_id || "");
        setHash(response.data.user_access || "");
        setNotificationArray(response.data.notifications || []);
        fetchWidgetInfo(response.data.user_access || "");
        setUserCurrentPlan(response.data.current_plan);
      } catch (err) {
        console.log(err);
        console.log(
          `ERROR (${err.response.status}) '${
            err.response.data.err || err.response.data.title
          }', ${err.response.data.err || err.response.data.message}`
        );
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg(`ERROR (${err.response.status}) 
            '${err.response.data.err || err.response.data.message}': 
            User data not found. Please reload and re-authenticate or contact support.
        `);
      }
    } else {
      return;
    }
  };

  const fetchWidgetInfo = async (user_hash) => {
    // make sure the user_hash is set
    if (user_hash) {
      try {
        // make the request to the server
        const request = await requestWidgetInformation(
          user_hash,
          user.accessToken
        );
        // set the widget styling
        setCustomizationObj(request.data.widget_style || {});
        setWidgetConnectedStatus(request.data.widget_install_status);
      } catch (err) {
        console.log(err);
        console.log(
          `ERROR (${err.response.status}) '${
            err.response.data.err || err.response.data.title
          }', ${err.response.data.err || err.response.data.message}`
        );
        return;
      }
    } else {
      return;
    }
  };

  const AuthSSEconnect = async (user_token) => {
    // get the connection link
    const sse_connect = import.meta.env.VITE_SSE_CONNECTION_LINK || "";
    try {
      await requestSseAuthentication(user_token);
      // set the sse link to connect
      setSSELink(sse_connect);
    } catch (err) {
      console.log(
        `ERROR (${err.response.status}) '${
          err.response.data.err || err.response.data.title
        }', ${err.response.data.err || err.response.data.message}`
      );
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(
        `ERROR (${err.response.status}) '${
          err.response.data.err || err.response.data.message
        }': Log out and connect again or contact support`
      );
    }
  };

  useEffect(() => {
    if (sse_link) {
      let previous_notif_array = 0;
      const eventSource = new EventSource(sse_link, { withCredentials: true });
      setEventSource(eventSource);
      eventSource.addEventListener("open", () => {});

      eventSource.addEventListener("message", (event) => {
        switch (JSON.parse(event.data).type) {
          case "visitor": {
            const updatedVisitors = JSON.parse(event.data);
            setVisitorsArray(updatedVisitors.data);
            break;
          }
          case "notification": {
            const updatedNotification = JSON.parse(event.data);
            if (updatedNotification.data.length === previous_notif_array + 1) {
              setModalOpen(true);
              setModalErrorMode(false);
              setModalMsg(updatedNotification.data[0].title);
              const notification_sound =
                document.getElementById("notification_sound");
              if (mute_notification_sound === false) {
                notification_sound.muted = true; // Mute the sound
                notification_sound.play().then(() => {
                  notification_sound.muted = false; // Unmute it after it starts playing
                });
              } else {
                notification_sound.muted = true;
              }
            }
            previous_notif_array = updatedNotification.data.length;
            setNotificationArray(updatedNotification.data);
            break;
          }
          case "analytics": {
            const analytics_obj = JSON.parse(event.data).data;
            setAnalyticsDataArray(analytics_obj);
            break;
          }
          case "widget_status": {
            const widget_status = JSON.parse(event.data);
            setWidgetConnectedStatus(widget_status.data);
            break;
          }
          default:
            break;
        }
      });

      eventSource.addEventListener("error", (event) => {
        if (event) {
          setModalOpen(true);
          setModalErrorMode(true);
          setModalMsg(
            "ERROR (500): Unable to load visitors and notifications, reload the app or contact support"
          );
        }
      });
      return () => {
        if (eventSource) {
          eventSource.close();
        }
      };
    }
  }, [sse_link, mute_notification_sound]);

  useEffect(() => {
    console.log("Current user: ", user);
    if (!user_register && user !== null) {
      fetchInfo(user.accessToken);
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        visitors_array,
        notification_array,
        seen_notification_array,
        setSeenNotificationArray,
        analytics_data_array,
        setWSLink,
        ws_link,
        event_source,
        AuthSSEconnect,
        setSSELink,
        setNotificationArray,
        mute_notification_sound,
        setMuteNotifSound,
        widget_connected_status,
        widget_customizations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const AppData = () => {
  return useContext(DataContext);
};
