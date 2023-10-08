import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
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

    const [user, setUser] = useState({});
    const [user_hash, setHash] = useState('');
    const [visitorsArray, setVisitors] = useState([]);
    const [notificationsArray, setNotification] = useState([]);
    const [seen_notifications, setSeenNotif] = useState([]);
    const [sse_link, setSSE] = useState('');
    const [event_source, setEventSource] = useState('');
    const [ws_link, setWS_Context] = useState('');
    const [chat_visitor, setChatRoom] = useState({});
    const [visitor_chat_room, setVisitorRoom] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [errorMode, setModalMode] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteModalInfo, setDeleteModalInfo] = useState({});
    const [DeleteModalUserAccount, setDeleteModalUser] = useState(false);
    const [isPasswordAuthModalVisible, setPasswordAuthModalVisible] = useState(false);
    const [isPasswordAuthModalOpen, setPasswordAuthModalOpen] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [customization_object, setCustomizationObj] = useState({});// widget admin customization object
    const [add_customization_obj, setAddedCustomizationObj] = useState({});// object to add new customization
    const [widget_connected, setWidgetConnected] = useState(false);// to display if the widget code is installed or not
    const [analytics_data, setAnalyticsData] = useState({});// to calculate and display the analytics data

    const Register = async(username, email, password, url) => {
        try{
            const create = await createUserWithEmailAndPassword(auth, email, password)
            if(create) {
                setModalOpen(false);
                const response = await axios.post('http://localhost:8080/user/register',{
                    web_url: url,
                    username: username
                },{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.currentUser.accessToken
                    }
                });
                if(response){
                    setUser(auth.currentUser);
                    setModalMode(false);
                    setModalMsg(`Welcome to chat buddy :)`);
                    setModalOpen(true);
                    return create
                }
            }
        } catch(err){
            const error_message = FirebaseErrorhandler(err.code);
            setModalOpen(true);
            setModalMode(true);
            setModalMsg(`ERROR (500): ${error_message}. Please try again or contact support`);
            if(auth.currentUser){
                const stopRegister = await deleteUser(auth.currentUser); 
                if(stopRegister){
                    return false
                }
            }
        }
    }

    const Login = async(email, password) => {
        try{
            setModalOpen(false);
            const login = await signInWithEmailAndPassword(auth, email, password)
            if(login){
                setUser(auth.currentUser);
                setModalMode(false);
                setModalMsg(`Welcome back  👋`);
                setModalOpen(true);
                return login
            }
        } catch(err) {
            const error_message = FirebaseErrorhandler(err.code);
            setModalOpen(true);
            setModalMode(true);
            setModalMsg(`ERROR: ${error_message}. Please try again`);
        }
    }

    const LogOut = async() => {
        try{
            if(sse_link){
                setSSE('')
            }
            return signOut(auth)
        } catch(err){
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to disconnect log out the account, please try again or contact support')
        }
    }

    const DeleteUserAccount = async(access_token) => {
        try{
            // send a request
            const request = await axios.delete('http://localhost:8080/user/remove-profile',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            });
            if(!request){
                setModalOpen(true);
                setModalMode(true);
                setModalMsg('ERROR: Unable to delete the profile. Please try again or contact support.')
                return
            }
            // set everything to null and navigate back to the login page
            setUser(null)
            // display the modal with the right message
            setModalOpen(true);
            setModalMode(false);
            setModalMsg('Profile deleted. See ya 👋');
            return
        } catch(err){
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to remove the account, please try again or contact support')
        }
    }

    const fetchInfo = async(user_id) => {
        try{
            if(user_id){
                const response = await axios.get('http://localhost:8080/user/current',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user_id
                    }
                });
                if(response){
                    AuthSSEconnect(user_id);
                    setHash(response.data.user_access);
                    setNotification(response.data.notifications);
                    fetchWidgetInfo(response.data.user_access);
                }
            }
        } catch(err){
            console.log(err.code);
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (404): Unable to load account information, reload the app or contact support');
        }
    }

    const fetchWidgetInfo = async(user_hash) => {
        try{
            // make sure the user_hash is set
            if(user_hash){
                // make the request to the server
                const request = await fetch(`http://localhost:8080/code/style-${user_hash}`)
                if(!request){
                    setModalOpen(true);
                    setModalMode(true);
                    setModalMsg('ERROR (404): Unable to find the widget info. Please try again.');
                    return
                }
                // set the customization object
                const data = await request.json();
                if(!data){
                    setModalOpen(true);
                    setModalMode(true);
                    setModalMsg('ERROR (404): Unable to set the widget style. Please try again.');
                    return
                }
                setCustomizationObj(data.widget_style);
            }
        } catch(err) {
            console.log(err.code);
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (404): Unable to find the widget info. Please try again.');
        }
    }

    const AuthSSEconnect = async(user_token) => {
        try{
            const sse_connect = import.meta.env.VITE_SSE_CONNECTION_LINK
            const request = await axios.get('http://localhost:8080/connection/auth-sse',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ user_token
                }
            });

            if(request){
                setSSE(sse_connect)
            }
        } catch(err){
            console.log(err)
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (404): Log out and connect again or contact support')
        }
    }

    const removeVisitor = async(visitr_id) => {
        try{
            const response = await axios.delete('http://localhost:8080/visitor/delete-visitor',{
                data: {
                    u_hash: user_hash ,
                    visitor_id: visitr_id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response){
                setModalMsg('Visitor deleted') 
                setModalOpen(true)
                setDeleteModalInfo({})
            }
        } catch(err){
            console.log(err)
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to delete visitor, please try again or contact support');
        }
    }

    const saveWidgetCustomization = async() => {
        try{
            if(Object.keys(add_customization_obj).length > 0){
                // make a request to save the customization inside the customization object
                const response = await axios.post('http://localhost:8080/code/save',{
                    customization_obj: add_customization_obj
                },{
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                if(response){
                    setModalOpen(true);
                    setModalMode(false);
                    setModalMsg('Saved successfully. Refresh to reflect the changes!');
                    setAddedCustomizationObj({});
                }
            }
        } catch(err){
            console.log(err)
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to save the new version of your widget. please try again.');
        }
    }

    useEffect(() => {
        if(sse_link){
            const eventSource = new EventSource(sse_link, { withCredentials: true });
            setEventSource(eventSource)
            eventSource.addEventListener('open', () => {});
                
            eventSource.addEventListener('message', (event) => {
                switch(JSON.parse(event.data).type){
                    case 'visitor':
                        const updatedVisitors = JSON.parse(event.data);
                        setVisitors(updatedVisitors.data);
                        break;
                    case 'notification':
                        const updatedNotification = JSON.parse(event.data);
                        setNotification(updatedNotification.data);
                        break;
                    case 'analytics':
                        const analytics_obj = JSON.parse(event.data).data;
                        setAnalyticsData(analytics_obj);
                        break;
                    case 'widget_status':
                        const widget_status = JSON.parse(event.data);
                        setWidgetConnected(widget_status.data);
                        break;
                    default:
                        break;
                }
            });
    
            eventSource.addEventListener("error", (event) => {
                if(event){
                    setModalOpen(true);
                    setModalMode(true);
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
            
            if(user) {
                setUser(user) 
                fetchInfo(user.accessToken)
            } else {
                setUser(null)
            }
        });
        return () => unsubscribe();
    },[auth])

    useEffect(() => {
        if (isModalOpen) {
            setIsVisible(true);
            const timeout = setTimeout(() => {
                setModalOpen(false);
            }, 5000);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (isDeleteModalOpen) {
            setIsDeleteModalVisible(true)
        } else {
            const timeout = setTimeout(() => setIsDeleteModalVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isDeleteModalOpen]);

    useEffect(() => {
        if (isPasswordAuthModalOpen) {
            setPasswordAuthModalVisible(true)
        } else {
            const timeout = setTimeout(() => setPasswordAuthModalVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isPasswordAuthModalOpen]);
    
    return ( 
        <UserContext.Provider value={{ 
            Register, 
            Login, 
            LogOut, 
            user, 
            user_hash, 
            visitorsArray, 
            setChatRoom, 
            chat_visitor, 
            setVisitorRoom, 
            visitor_chat_room, 
            setWS_Context, 
            ws_link, 
            notificationsArray, 
            seen_notifications, 
            setSeenNotif, 
            isModalOpen, 
            setModalOpen, 
            setModalMsg, 
            isVisible, 
            modalMsg, 
            setDeleteModalOpen, 
            isDeleteModalOpen, 
            setDeleteModalInfo, 
            deleteModalInfo, 
            removeVisitor,
            setPasswordAuthModalOpen,
            isPasswordAuthModalOpen,
            setModalMode,
            errorMode,
            showLoader, 
            setShowLoader,
            customization_object,
            setCustomizationObj,
            add_customization_obj,
            setAddedCustomizationObj,
            saveWidgetCustomization,
            widget_connected,
            analytics_data,
            DeleteUserAccount,
            DeleteModalUserAccount, 
            setDeleteModalUser
            }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}