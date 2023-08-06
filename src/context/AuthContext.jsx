import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

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
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteModalInfo, setDeleteModalInfo] = useState({});
    const [isPasswordAuthModalVisible, setPasswordAuthModalVisible] = useState(false);
    const [isPasswordAuthModalOpen, setPasswordAuthModalOpen] = useState(false);

    const Register = async(username, email, password, url) => {
        try{
            const create = await createUserWithEmailAndPassword(auth, email, password)

            if(create) {
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
                    return create
                }
            }
        } catch(err){
            console.log(err) 
            const stopRegister = await deleteUser(auth.currentUser); 
            if(stopRegister){
                return false
            }
        }
    }

    const Login = async(email, password) => {
        try{
            const login = await signInWithEmailAndPassword(auth, email, password)
            if(login){
                setUser(auth.currentUser);
                setModalMsg(`Welcome back  👋`);
                setModalOpen(true);
                return login
            }
        } catch(err) {
            console.log(err)
        }
    }

    const LogOut = async() => {
        if(sse_link){
            setSSE('')
        }
        return signOut(auth)
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
                    console.log("The response", response.data)
                    AuthSSEconnect(user_id)
                    setHash(response.data.user_access)
                    setNotification(response.data.notifications)
                    
                }
            }
        } catch(err){
            console.log(err)
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
                console.log("User sse auth", request)
                setSSE(sse_connect)
            }
        } catch(err){
            console.log(err)
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
        }
    }

    useEffect(() => {
        if(sse_link && user){
            const eventSource = new EventSource(sse_link, { withCredentials: true });
            setEventSource(eventSource)
            eventSource.addEventListener('open', () => {
                console.log('SSE connection has started');
            });
                
            eventSource.addEventListener('message', (event) => {
                switch(JSON.parse(event.data).type){
                    case 'visitor':
                        const updatedVisitors = JSON.parse(event.data);
                        setVisitors(updatedVisitors.data);
                        break;
                    case 'notification':
                        const updatedNotification = JSON.parse(event.data);
                        console.log('notification array', updatedNotification)
                        setNotification(updatedNotification.data);
                        break;
                    default:
                        break;
                }
            });
    
            eventSource.addEventListener("error", (event) => {
                console.log('frontend',event)
            });
            return () => {
                if(eventSource){
                    eventSource.close();
                    console.log('SSE connection has been closed');
                }
            };
        }
    },[sse_link])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(user){
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
            isPasswordAuthModalOpen
            }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}