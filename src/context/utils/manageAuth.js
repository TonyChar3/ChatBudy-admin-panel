import { reauthenticateWithCredential, EmailAuthProvider, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import axios from 'axios';

// regex to sanitize and veirfy the given input values
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^[^<>&"'\`]+$/ ;

/**
 * Handle the firebase error code when authenticating or registering the user
 */
const FirebaseErrorhandler = (error_code) => {
    switch (error_code){
        case "auth/invalid-email":
            return "Wrong Email"
        case "auth/missing-password":
            return "Please enter a password"
        case "auth/user-not-found":
            return "Account not found"
        case "auth/wrong-password":
            return "Wrong password"
        default:
            break;    
    }
}
/**
 * Handle the user password strength
 */
const calculatePasswordStrength = ( passwrd ) => {
    let strength = 0;

    if(passwrd.length === 0) {
        return 0
    } 
    if (passwrd.length !== 0 && passwrd.length > 8) strength += 14.29;
    if (passwrd.length >= 8) strength += 14.29;
    if (/[A-Z]/.test(passwrd)) strength += 14.29;
    if (/[a-z]/.test(passwrd)) strength += 14.29;
    if (/[0-9]/.test(passwrd)) strength += 14.29;
    if (/[!@#$%^&*]/.test(passwrd)) strength += 14.29;
    if (!/\s/.test(passwrd)) strength += 14.29;

    return Math.round(strength);
}
/**
 * Handle password strength message inside the span
 */
const passwordStrengthSpanMessage = (passwrd_strength) => {
    if (passwrd_strength === 0) return {text_color: 'text-gray-400', bg_color: '', msg: 'strength'};
    else if (passwrd_strength > 0 && passwrd_strength <= 25) return {text_color: 'text-red-400', bg_color: 'bg-red-400', msg: 'Weak!'};
    else if (passwrd_strength > 25 && passwrd_strength <= 50) return {text_color: 'text-orange-400',bg_color: 'bg-orange-400', msg: 'Weak'};
    else if (passwrd_strength > 50 && passwrd_strength <= 80) return {text_color: 'text-yellow-400', bg_color: 'bg-yellow-400', msg: 'Strong'};
    else if (passwrd_strength > 80) return {text_color: 'text-green-400', bg_color: 'bg-green-400', msg: 'Very strong!'};
    else return 'Unknown'
}
/**
 * User re-authentication to reset password etc.
 */
const PasswordUpdateAuthentication = async(email, password) => {
    // get firebase auth
    const auth = getAuth();
    try{
        // make sure nothing is empty
        if(email === '' || password === ''){
            return {
                error: true,
                message: 'Please make sure to not leave any field empty'
            }

        // verify with Regex to sanitize the values
        } else if(emailRegex.test(email) && passwordRegex.test(password)){
            // get the user credentials
            const credentials = EmailAuthProvider.credential(email, password);
            // re-authenticate the user with FireBase
            await reauthenticateWithCredential(auth.currentUser, credentials);
            // make sure the user was re-authenticated
            await sendPasswordResetEmail(auth, auth.currentUser.email)
            return {
                error: false,
                message: 'Email sent'
            }
        }
    } catch(err){
        console.log(err);
        // handle error
        const error_message = FirebaseErrorhandler(err.code);
        return {
            error: true,
            message: `${error_message}` || 'ERROR: unable to re-authenticate. Please verify your credentials.'
        }
    }
}
/**
 * User credentials sanitize with Regex
 */
const credentialsRegexSanitize = (value) => {
    // error object
    const error_obj = {
        error: false,
        array: []
    };
    // regex
    const url_regex = /^https:\/\/(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}[^ ]*$/
    const passwrd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const username_regex = /^[a-zA-Z0-9]+([\s._][a-zA-Z0-9]+)?$/
    // loop through the Object keys
    Object.keys(value).forEach(keys => {
        switch (keys){
            case 'email':
                const email_test = email_regex.test(value[keys])
                if(!email_test){
                    error_obj.error = true;
                    error_obj.array.push({msg: 'ERROR: Invalid email address'});
                }
                break;
            case 'website_url':
                const website_test = url_regex.test(value[keys])
                if(!website_test){
                    error_obj.error = true;
                    error_obj.array.push({msg: 'ERROR: Invalid website url'});
                }
                break;
            case 'user_name':
                const username_test = username_regex.test(value[keys]);
                if(!username_test){
                    error_obj.error = true;
                    error_obj.array.push({msg: 'ERROR: Invalid user name'});
                }
                break;
            case 'password':
                const password_test = passwrd_regex.test(value[keys]);
                if(!password_test){
                    error_obj.error = true;
                    error_obj.array.push({msg: 'ERROR: Invalid password'});
                }
                break;
            default:
                break;
        }
    });

    return error_obj;
}
/**
 * Forgot password request rate limit
 */
const verifyRateLimit = async(email, count) => {
    try{
        // set the object for the rate limiting
        // send a request to check if the user is allowed to send an email to the email set
        const response = await axios.post('https://chatbudy-api.onrender.com/password-update/request-limit',{
            limit_obj: {
                email: email,
                request_count: count
            }
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch(err){
        return {
            error: true,
            msg: err.response.data.message || 'Unable to set a rate limit'
        }
    }
}
/**
 * Stripe checkout for Plus + plan
 */
const checkoutPlusPlan = async(user_type, user_id, user_data) => {
    try{
        // get the stripe api key
        const key = import.meta.env.VITE_STRIPE_KEY
        // create the payment intent https://chatbudy-api.onrender.com
        const payment = await axios.post('https://chatbudy-api.onrender.com/stripe/create-payment-intent',
        {
            user_type: user_type,
            user_id: user_id,
            user_data: user_data || {}
        },
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
            }
        });
        window.location.href = payment.data.url
    } catch(err){
        return {
            error: true,
            msg: err || 'Error starting checkout session.'
        }
    }
}
/**
 * Update user plan to the persistent storage
 */
const updateUserPlan = async(user_access, new_plan) => {
    try{
        // send a request to the backend with the new plan
        // save it to persistent storage
        await axios.put('https://chatbudy-api.onrender.com/user/update-profile',{
            new_plan: new_plan
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${user_access}`
            }
        });
        return true
    } catch(err){
        return {
            error: true,
            msg: err.response.data.message || 'Unable to update the user plan'
        }
    }
}
/**
 * Get checkout result variable in the params
 */
const getQueryParamStripeResult = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
}
/**
 * Register the user
 */
const registerUsertoAPI = async(auth, url, username, plan) => {
    try{
        const auth = getAuth();
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
    }
}

export { 
    FirebaseErrorhandler, 
    calculatePasswordStrength, 
    passwordStrengthSpanMessage, 
    PasswordUpdateAuthentication, 
    credentialsRegexSanitize, 
    verifyRateLimit, 
    checkoutPlusPlan, 
    updateUserPlan,
    getQueryParamStripeResult ,
    registerUsertoAPI
}