import { useEffect, useState } from "react";
import axios from "axios";

import NotificationCard from "../components/notification-card.component";
import NotificationScroll from "../../../../../components/scroll/notificationScroll";

import { UserAuth } from "../../../../service/authentication/authentication.context";
import { ModalState } from "../../../../service/modals/modals.context";
import { AppData } from "../../../../service/data/app-data.context";

const NotificationPage = ({ animationClass, open_close_function }) => {
  const { user } = UserAuth();
  const { setModalOpen, setModalErrorMode, setModalMsg } = ModalState();
  const { notification_array, mute_notification_sound, setMuteNotifSound } =
    AppData();

  const [openClearModal, setClear] = useState(false);
  const [open_notif_group, setOpen] = useState({});
  const [unread_group_notif, setUnreadNotif] = useState([]);

  let groupedNotificationsArray;

  const handleClearNotifArray = async () => {
    try {
      if (notification_array.length > 0) {
        await axios.delete(
          "https://chatbudy-api.onrender.com/user/clear-notification",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
      }
      setClear((openClearModal) => !openClearModal);
    } catch (err) {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(
        "ERROR (500): Unable to remove notification, Please try again or contact support"
      );
    }
  };

  const handleNotifGroupClick = (notif_group_id) => {
    setOpen((prev) => ({
      ...prev,
      [notif_group_id]: !prev[notif_group_id],
    }));
  };

  if (Array.isArray(notification_array)) {
    groupedNotificationsArray = notification_array.reduce(
      (groups, notification) => {
        let key = notification.sent_from;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(notification);
        return groups;
      },
      {}
    );
  }

  useEffect(() => {
    if (groupedNotificationsArray) {
      let data_array = [];
      Object.keys(groupedNotificationsArray).forEach((key) => {
        let acc = 0;
        groupedNotificationsArray[key].forEach((notif) => {
          acc += 1;
        });
        data_array.push(acc);
      });
      setUnreadNotif(data_array);
    }
  }, []);

  return (
    <>
      <div
        className={`absolute z-[15] lg:rounded-lg lg:top-[45%] left-0 right-0 lg:left-[5%] lg:m-0 m-auto w-full h-full lg:h-[400px] lg:w-80 flex flex-col border-2 border-[#A881D4] text-[#A881D4] bg-white shadow-md shadow-[#6C2E9C] ${animationClass}`}
      >
        <div
          onClick={() =>
            mute_notification_sound
              ? setMuteNotifSound(false)
              : setMuteNotifSound(true)
          }
          className="absolute top-1 left-2 p-1 cursor-pointer"
        >
          <i
            className={`fa-regular fa-volume${
              mute_notification_sound ? "-slash" : ""
            } text-xl`}
          ></i>
        </div>
        <div className="w-full p-2 flex flex-row justify-center items-center bg-white border-b-2 border-[#A881D4] rounded-t-lg">
          <i
            key={openClearModal}
            onClick={() => setClear((openClearModal) => !openClearModal)}
            className={`fa-regular fa-bell ml-4 text-2xl cursor-pointer transition-transform animate-swing`}
          ></i>
        </div>
        <div
          className={`${
            openClearModal
              ? "translate-y-0 opacity-100"
              : "translate-y-[-20px] opacity-0"
          } absolute top-[7%] lg:top-[13%] left-[41.8%] lg:left-[39.8%] p-2 w-20 z-10 flex flex-row justify-center transition-all duration-500 ease-in-out`}
        >
          <button
            onClick={handleClearNotifArray}
            className="w-80 p-1 bg-[#6C2E9C] lg:text-sm text-white rounded-xl cursor-pointer transition-transform active:scale-[0.95]"
          >
            CLEAR
          </button>
        </div>
        <div className="w-full h-[83%] flex flex-col">
          <NotificationScroll>
            {Array.isArray(notification_array) && notification_array.length ? (
              Object.keys(groupedNotificationsArray).map((sent_from, i) => (
                <div
                  className={`p-2 bg-gray-500 ${
                    open_notif_group[sent_from]
                      ? "bg-opacity-0"
                      : "bg-opacity-10"
                  } transition-all ease-in-out rounded-lg my-8 w-[95%] mt-4 lg:my-4 mx-auto cursor-pointer`}
                  key={i}
                >
                  <div
                    onClick={() => handleNotifGroupClick(sent_from)}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <h2
                      className={`p-2 ${
                        open_notif_group[sent_from] ? "text-xl" : "text-lg"
                      }`}
                    >
                      {sent_from}
                      <span className="ml-2 text-sm">
                        {unread_group_notif[i]}
                      </span>
                    </h2>
                    <i
                      className={`fa-solid fa-chevrons-right ${
                        open_notif_group[sent_from] ? "rotate-90" : ""
                      } duration-300`}
                    ></i>
                  </div>
                  <div
                    className={`transition-all overflow-hidden ${
                      open_notif_group[sent_from]
                        ? "max-h-full opacity-100"
                        : "max-h-0 opacity-0"
                    } ease-in-out`}
                  >
                    {groupedNotificationsArray[sent_from].map((notif, j) => (
                      <NotificationCard
                        key={j}
                        notif_id={notif._id}
                        notif_title={notif.title}
                        notif_content={notif.content}
                        sent_from={notif.sent_from}
                        notif_date={notif.createdAt}
                        notif_action={notif.action}
                        open_close_function={open_close_function}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full lg:h-[300px] flex flex-col justify-center items-center">
                <i className="fa-regular fa-circle-exclamation text-2xl mb-2"></i>
                <h2 className="text-xl">No notification</h2>
              </div>
            )}
          </NotificationScroll>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
