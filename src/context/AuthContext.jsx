import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [user_hash, setHash] = useState('');
    const [notifications, setNotification] = useState([]);

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
                    setHash(response.data.user_access)
                    setNotification(response.data.notifications)
                }
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(user){
                setUser(auth.currentUser)
            } else {
                setUser(null)
            }
        });
        return () => unsubscribe();
    },[auth])

    useEffect(() => {
        if(user){
            fetchInfo(user.accessToken)
        }

    },[user])

    return ( 
        <UserContext.Provider value={{ Register, Login, LogOut, user, user_hash }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}