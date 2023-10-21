import { useState, useEffect } from "react";

const useWebSocket = (url) => {
    const [ws, setWs] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if(url.length > 0){
            const websocket = new WebSocket(url);

            websocket.onopen = () => console.log('Connection established with visitor');
            websocket.onmessage = (event) => setData(JSON.parse(event.data));
            websocket.onerror = (event) => console.log('WebSocket error: ', event);
            websocket.onclose = () => console.log('WebSocket closed');
    
            setWs(websocket);
            
            return () => {
                websocket.close();
            };
        }
    }, [url]);

    return [ws, data];
};

export { useWebSocket }
