import axios from 'axios';

/**
 * Fetch the chat room from the DB
 */
const FetchChatRoom = async(visitor_id, user_hash, token) => {
    try{
        // auth for the WebSocket connection
        const connect = await axios.post('https://chatbudy-api.onrender.com/chat/user-auth-ws',{
            data: {
                visitor_id: visitor_id,
                user_hash: user_hash 
            }
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return connect
    } catch(err){
        return {
            error: true,
            msg: err
        }
    }
}

/**
 * Clean up opened notification
 */
const CleanUpReadNotification = async(notif_array, token) => {
    try{
        await axios.delete('https://chatbudy-api.onrender.com/user/clean-up-notification', {
            data: {
                notif_array: notif_array
            },
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return true
    } catch(err){
        return {
            error: true,
            error_msg: 'Cleaning up notifications went wrong.'
        }
    }
}

export { FetchChatRoom, CleanUpReadNotification }