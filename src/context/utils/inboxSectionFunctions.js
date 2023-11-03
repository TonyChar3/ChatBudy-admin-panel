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

export { FetchChatRoom }