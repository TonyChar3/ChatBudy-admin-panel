import axios from "axios";
import { getAuth, updateProfile } from "firebase/auth";

/**
 * Register a new user to the app
 */
export const requestUserRegister = async(auth, url, username, plan) => {
    try {
        // create the user in the mongoDB
        await axios.post('https://chatbudy-api.onrender.com/user/register',{
            web_url: url,
            username: username,
            plan: plan
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.currentUser.accessToken
            }
        });
        // set the displayname for the FireBase account
        await updateProfile(auth.currentUser, { displayName: username });
        return true
    } catch(err){
        return {
            error: true,
            msg: err.response.data.message || 'Unable to register the user to the API'
        }
    };
};