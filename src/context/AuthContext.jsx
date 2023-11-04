import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    deleteUser, 
    signInWithEmailAndPassword, 
    signOut, 
    getAuth
} from "firebase/auth";
import axios from 'axios';
import { FirebaseErrorhandler } from "./utils/manageAuth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const auth = getAuth();

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [user_register, setRegisterUser] = useState(false);
    const [user_hash, setHash] = useState('');
    const [visitors_array, setVisitorsArray] = useState(null);
    const [notification_array, setNotificationArray] = useState([]);
    const [seen_notification_array, setSeenNotificationArray] = useState([]);
    const [analytics_data_array, setAnalyticsDataArray] = useState({});// to calculate and display the analytics data
    const [sse_link, setSSELink] = useState('');
    const [event_source, setEventSource] = useState('');
    const [ws_link, setWSLink] = useState('');
    const [mobile_chat_room, setMobileChatRoom] = useState({});
    const [desktop_chat_room, setDeskTopChatRoom] = useState({});
    const [is_modal_open, setModalOpen] = useState(false);
    const [is_modal_visible, setIsVisible] = useState(false);
    const [modal_message, setModalMsg] = useState('');
    const [modal_error_mode, setModalErrorMode] = useState(false);
    const [is_delete_modal_open, setDeleteModalOpen] = useState(false);
    const [is_delete_modal_visible, setIsDeleteModalVisible] = useState(false);
    const [delete_modal_info, setDeleteModalInfo] = useState({});
    const [delete_modal_useraccount, setDeleteModalUser] = useState(false);
    const [is_passwordauth_modal_visible, setPasswordAuthModalVisible] = useState(false);
    const [is_passwordauth_modal_open, setPasswordAuthModalOpen] = useState(false);
    const [show_loader, setShowLoader] = useState(false);
    const [widget_customizations, setCustomizationObj] = useState({});// widget admin customization object
    const [added_customization_object, setAddedCustomizationObj] = useState({});// object to add new customization
    const [widget_connected_status, setWidgetConnectedStatus] = useState(false);// to display if the widget code is installed or not
    const [mute_notification_sound, setMuteNotifSound] = useState(false);// admin can mute the sound of the notification

    const Register = async(username, url) => {
        try{
            // Force the closing of the modal + make sure error mode is off
            setModalOpen(false);
            // request to the backend API
            await axios.post('https://chatbudy-api.onrender.com/user/register',{
                web_url: url,
                username: username
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.currentUser.accessToken
                }
            });
            // set the current logged in user
            setRegisterUser(false);
            setUser(auth.currentUser);
            setModalErrorMode(false);
            navigate('/navbar/visitors');
            setShowLoader(false);
            return true
        } catch(err){
            const error_message = FirebaseErrorhandler(err.code);
            console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message || error_message}`);
            setRegisterUser(true);
            setShowLoader(false);
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR (${err.response.status}) 
            '${err.response.data.err || err.response.data.message || error_message}': 
            Unable to disconnect log out the account, please try again or contact support.
            `);
            if(auth.currentUser){
                DeleteUserAccount(auth.currentUser.accessToken);
            }
            return false
        }
    }

    const Login = async(email, password) => {
        try{
            // make sure the modal is closed down
            setModalOpen(false);
            // login using firebase
            await signInWithEmailAndPassword(auth, email, password)
            // set everything up for the user
            setUser(auth.currentUser);
            setModalErrorMode(false);
            // Welcome him
            setModalMsg(`Welcome back  👋`);
            setModalOpen(true);
            return true
        } catch(err) {
            const error_message = FirebaseErrorhandler(err.code);
            console.log(`ERROR '${err.code}', ${err}`);
            setModalOpen(true);
            setModalErrorMode(true)
            setModalMsg(`ERROR: 
            '${error_message}'
            `);
        }
    }

    const LogOut = async() => {
        try{
            // close the sse connection
            event_source.close();
            // clean up the SSE link variable
            setSSELink('');
            // Sign out with Firebase
            await signOut(auth);
            // navigate back to the Login page
            navigate("/");
        } catch(err){
            const error_message = FirebaseErrorhandler(err.code);
            console.log(`ERROR '${err.code}', ${err}`);
            setModalOpen(true);
            setModalErrorMode(true)
            setModalMsg(`ERROR: 
            '${error_message}'
            `);
        }
    }

    const DeleteUserAccount = async(access_token) => {
        try{
            // send a request to delete the account
            await axios.delete('https://chatbudy-api.onrender.com/user/remove-profile',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });
            // delete from firebase right after
            await deleteUser(auth.currentUser);
            // set everything to null and navigate back to the login page
            setUser(null)
            // display the modal with the right message
            setModalOpen(true);
            setModalErrorMode(false);
            setModalMsg('Profile deleted. See ya 👋');
            return
        } catch(err){
            console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message}`);
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR (${err.response.status}) 
            '${err.response.data.err || err.response.data.message}': 
            Unable to remove the account, please try again or contact support.
            `);
            return false
        }
    }

    const fetchInfo = async(user_id) => {
        if(user_id !== 'undefined' && user_id){
            try{
                // response to get the user account info from the DB
                const response = await axios.get('https://chatbudy-api.onrender.com/user/current',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user_id
                    }
                });
                // set the data to connect SSE etc.
                AuthSSEconnect(user_id || '');
                setHash(response.data.user_access || '');
                setNotificationArray(response.data.notifications || []);
                fetchWidgetInfo(response.data.user_access || '');
            } catch(err){
                console.log(err)
                console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message}`);
                setModalOpen(true);
                setModalErrorMode(true);
                setModalMsg(`ERROR (${err.response.status}) 
                '${err.response.data.err || err.response.data.message}': 
                User data not found. Please reload and re-authenticate or contact support.
                `);
            }
        } else {
            return
        }
    }

    const fetchWidgetInfo = async(user_hash) => {
        // make sure the user_hash is set
        if(user_hash){
            try{
                // make the request to the server
                const request = await axios.get(`https://chatbudy-api.onrender.com/code/admin-style-${user_hash}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                // set the widget styling
                setCustomizationObj(request.data.widget_style || {});
            } catch(err) {
                console.log(err)
                console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message}`);
                setModalOpen(true);
                setModalErrorMode(true);
                setModalMsg(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.message}': Unable to find the widget info. Please try again.`);
                return
            }
        } else {
            return
        }
    }

    const AuthSSEconnect = async(user_token) => {
        // get the connection link
        const sse_connect = import.meta.env.VITE_SSE_CONNECTION_LINK || '';
        try{
            // request to authenticate the user for an SSE connection
            await axios.get('https://chatbudy-api.onrender.com/connection/auth-sse',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ user_token
                }
            });
            // set the sse link to connect
            setSSELink(sse_connect);
        } catch(err){
            console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message}`);
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.message}': Log out and connect again or contact support`);
        }
    }

    const removeVisitor = async(visitr_id) => {
        try{
            // make the request to the delete the visitor
            await axios.delete('https://chatbudy-api.onrender.com/visitor/delete-visitor',{
                data: {
                    user_hash: user_hash,
                    visitor_id: visitr_id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                }
            });
            // inform that it did succeed
            setModalErrorMode(false);
            setModalMsg('Visitor deleted');
            setModalOpen(true);
            setDeleteModalInfo({});
        } catch(err){
            console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${err.response.data.err || err.response.data.message}`);
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.message}': Unable to delete visitor, please try again or contact support`);
        }
    }

    const saveWidgetCustomization = async() => {
        try{
            if(Object.keys(added_customization_object).length > 0){
                // make a request to save the customization inside the customization object
                await axios.post('https://chatbudy-api.onrender.com/code/save',{
                    customization_obj: added_customization_object
                },{
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                setModalErrorMode(false);
                setAddedCustomizationObj({});
                window.location.reload();// refresh page to reflect new changes for the user
            }
        } catch(err){
            console.log(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.title}', ${ err.response.data.err || err.response.data.message }`);
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR (${err.response.status}) '${err.response.data.err || err.response.data.message }': Unable to save new widget style. Please try again or contact support`);
        }
    }

    useEffect(() => {
        if(sse_link){
            let previous_notif_array = 0;
            const eventSource = new EventSource(sse_link, { withCredentials: true });
            setEventSource(eventSource)
            eventSource.addEventListener('open', () => {});
                
            eventSource.addEventListener('message', (event) => {
                switch(JSON.parse(event.data).type){
                    case 'visitor':
                        const updatedVisitors = JSON.parse(event.data);
                        setVisitorsArray(updatedVisitors.data);
                        break;
                    case 'notification':
                        const updatedNotification = JSON.parse(event.data);
                        if(updatedNotification.data.length === (previous_notif_array+1)){
                            setModalOpen(true);
                            setModalErrorMode(false);
                            setModalMsg(updatedNotification.data[0].title);
                            const notification_sound = document.getElementById('notification_sound');
                            if (!mute_notification_sound) {
                                notification_sound.muted = true;  // Mute the sound
                                notification_sound.play().then(() => {
                                    notification_sound.muted = false;  // Unmute it after it starts playing
                                });
                            }
                        }
                        previous_notif_array = updatedNotification.data.length;
                        setNotificationArray(updatedNotification.data);
                        break;
                    case 'analytics':
                        const analytics_obj = JSON.parse(event.data).data;
                        setAnalyticsDataArray(analytics_obj);
                        break;
                    case 'widget_status':
                        const widget_status = JSON.parse(event.data);
                        setWidgetConnectedStatus(widget_status.data);
                        break;
                    default:
                        break;
                }
            });
    
            eventSource.addEventListener("error", (event) => {
                if(event){
                    setModalOpen(true);
                    setModalErrorMode(true);
                    setModalMsg('ERROR (500): Unable to load visitors and notifications, reload the app or contact support');
                }
            });
            return () => {
                if(eventSource){
                    eventSource.close();
                }
            };
        }
    },[sse_link])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(!user) {
                setUser(null)
            }
            setUser(user) 
        });
        return () => unsubscribe();
    },[auth]);

    useEffect(() => {
        if(!user_register && user !== null){
            fetchInfo(user.accessToken)
        }
    },[user]);

    useEffect(() => {
        if (is_modal_open) {
            setIsVisible(true);
            const timeout = setTimeout(() => {
                setModalOpen(false);
            }, 5000);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [is_modal_open]);

    useEffect(() => {
        if (is_delete_modal_open) {
            setIsDeleteModalVisible(true)
        } else {
            const timeout = setTimeout(() => setIsDeleteModalVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [is_delete_modal_open]);

    useEffect(() => {
        if (is_passwordauth_modal_open) {
            setPasswordAuthModalVisible(true)
        } else {
            const timeout = setTimeout(() => setPasswordAuthModalVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [is_passwordauth_modal_open]);

    return ( 
        <UserContext.Provider value={{ 
            Register, 
            Login, 
            LogOut, 
            user, 
            user_hash, 
            visitors_array, 
            setMobileChatRoom, 
            mobile_chat_room, 
            setDeskTopChatRoom, 
            desktop_chat_room, 
            setWSLink, 
            ws_link, 
            notification_array, 
            seen_notification_array, 
            setSeenNotificationArray, 
            is_modal_open, 
            setModalOpen, 
            setModalMsg, 
            is_modal_visible, 
            modal_message, 
            setDeleteModalOpen, 
            is_delete_modal_open, 
            setDeleteModalInfo, 
            delete_modal_info, 
            removeVisitor,
            setPasswordAuthModalOpen,
            is_passwordauth_modal_open,
            setModalErrorMode,
            modal_error_mode,
            show_loader, 
            setShowLoader,
            widget_customizations,
            setCustomizationObj,
            added_customization_object,
            setAddedCustomizationObj,
            saveWidgetCustomization,
            widget_connected_status,
            analytics_data_array,
            DeleteUserAccount,
            delete_modal_useraccount, 
            setDeleteModalUser,
            event_source,
            setRegisterUser,
            fetchInfo,
            mute_notification_sound, 
            setMuteNotifSound
            }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}