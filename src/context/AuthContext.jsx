import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const Register = async(email, password) => {
        try{
            const create = await createUserWithEmailAndPassword(auth, email, password)

            if(create) {
                return create
            }
        } catch(err){
            console.log(err)
        }
    }

    const Login = async(email, password) => {
        try{
            const login = await signInWithEmailAndPassword(auth, email, password)
            if(login){
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
                axios.get('http://localhost:8080/user/current',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.currentUser.accessToken
                    }
                })
                .then(resp => {
                    setUser(resp.data)
                })
                .catch(err => {
                    setUser(null)
                    console.log(err)
                })
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