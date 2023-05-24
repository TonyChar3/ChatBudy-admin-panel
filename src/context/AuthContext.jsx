import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase_setup/firebase_conf';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const Register = async(username, email, password) => {
        try{
            const create = await createUserWithEmailAndPassword(auth, email, password)

            if(create) {
                console.log(auth.currentUser)
                return create
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function(user){
            if(user){
                setUser(auth.currentUser)
            }
        });

        return () => unsubscribe();
    },[])

    return ( 
        <UserContext.Provider value={{ Register, user }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}