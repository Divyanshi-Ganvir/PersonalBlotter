import { createContext } from "react";

export const webSocketConnection = (delayTime, durationTime) => { // although defined by const, works exactly like a function, both are the same thing. 
    const ws = new WebSocket('ws://localhost:5001'); // Opens the connection to the server

    // Handing incoming messages
    ws.onmessage = (event) => {
        console.log(`Received random number: ${event.data}`);
    };

    // Handling connection opening 
    ws.onopen = () => {
        console.log('WebSocket server connection successful');
        ws.send(JSON.stringify({delayTime, durationTime}));
    };

    // handling connection closure
    ws.onclose = () => {
        console.log('WebSocket server connection closed.');
    };

    // Handling any connection errors
    ws.onerror = (error) => {
        console.error('WebSocket server error: ', error);
    };

    // Returning the WebSocket instance to allow intersection with it 
    return ws;
}

export const WebSocketContext = createContext();