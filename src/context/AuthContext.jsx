import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const Register = async(email, password, url) => {
        try{
            const create = await createUserWithEmailAndPassword(auth, email, password)

            if(create) {
                const response = await axios.post('http://localhost:8080/user/register',{
                    web_url: url
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

    return ( 
        <UserContext.Provider value={{ Register, Login, LogOut, user }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}