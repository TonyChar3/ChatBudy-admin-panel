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

export { FirebaseErrorhandler, calculatePasswordStrength, passwordStrengthSpanMessage }