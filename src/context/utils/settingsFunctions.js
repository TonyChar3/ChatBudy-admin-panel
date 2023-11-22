import axios from 'axios';
import { sanitizeInputValue } from './security';

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

/**
 * Save the new upated User name or email
 */
const saveNewProfileInfo = async(user_name, user_email, token) => {
    try{
        // sanitize the given data
        const sanitize_username = sanitizeInputValue(user_name);
        const sanitize_email = sanitizeInputValue(user_email);
        if(!sanitize_email && !emailRegex.test(user_email)){
            return {
                error: true,
                msg: 'Invalid email'
            }
        }
        if(!sanitize_username){
            return {
                error: true,
                msg: 'Invalid user name'
            }
        }
        // save it to persistent storage
        await axios.put('https://chatbudy-api.onrender.com/user/update-profile',{
            new_name: sanitize_username,
            new_email: sanitize_email
        },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        }
        });
        // refresh the page
        window.location.reload();
    } catch(err){
        return {
            error: true,
            msg: err.response.data.message || 'ERROR: Unable to save and update the profile. Please try again or contact support.'
        }
    }
}
/**
 * Generate a .csv file for download
 */
const generateCSVfile = async(token) => {
    try{
        const request = await axios.get('https://chatbudy-api.onrender.com/user/download-visitor-csv', {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const url = window.URL.createObjectURL(new Blob([request.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'visitors.csv');
        document.body.appendChild(link);
        link.click();
    } catch(err){
        return {
            error: true,
            msg: err.response.data.message || 'Unable to generate a .csv file. Please try again or contact support'
        }
    }
}
/**
 * Get the widget intsall script tag
 */
const widgetScriptTagFetch = async(token) => {
    try{
        // fetch the script tag from the DB
        const script_tag = await axios.get('https://chatbudy-api.onrender.com/code/link',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        // return it 
        return {
            error: false,
            msg: script_tag.data.link
        }
    } catch(err){
        // catch and return an error
        return {
            error: true,
            msg: err.response.data.message || 'ERROR fetching the script tag. Please refresh and try again or contact support.'
        }
    }
}
/**
 * Start user billing portal session
 */
const startStripePortalSession = async(token) => {
    try{
        const session = await axios.post('https://chatbudy-api.onrender.com/stripe/customer-portal',{},{
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        window.location.href = session.data.url
    } catch(err){
        console.log(err)
        return {
            error: true,
            error_msg: 'Error starting portal session.'
        }
    }
}
export { saveNewProfileInfo, generateCSVfile, widgetScriptTagFetch, startStripePortalSession }