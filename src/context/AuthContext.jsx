import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [user_hash, setHash] = useState('');
    const [visitorsArray, setVisitors] = useState([]);
    const [notifications, setNotification] = useState([]);
    const [sse_link, setSSE] = useState('');
    const [ws_link, setWS_Context] = useState('');
    const [chat_visitor, setChatRoom] = useState({});
    const [visitor_chat_room, setVisitorRoom] = useState({});

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
                setUser(auth.currentUser)
                return login
            }
        } catch(err) {
            console.log(err)
        }
    }

    const LogOut = () => {
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

    useEffect(() => {
        if(sse_link){
            const eventSource = new EventSource(sse_link, { withCredentials: true });
            eventSource.addEventListener('open', () => {
                console.log('SSE connection has started');
            });
                
            eventSource.addEventListener('message', (event) => {
                const updatedVisitors = JSON.parse(event.data);
                console.log(updatedVisitors)
                setVisitors(updatedVisitors)
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

    return ( 
        <UserContext.Provider value={{ Register, Login, LogOut, user, user_hash, visitorsArray, setChatRoom, chat_visitor, setVisitorRoom, visitor_chat_room, setWS_Context, ws_link}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}