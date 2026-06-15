import './Components.css';
import { useState, useContext } from 'react';
import {webSocketConnection, WebSocketContext} from "./WebSocketConnection";

function UpdateInput({setSharedData}) {
    const sharedConnection = useContext(WebSocketContext)

    const [showAfterTime, setShowAfterTime] = useState(0)
    const [duration, setDuration] = useState(0)
    

    function handleDelayInput(e) {
        setShowAfterTime(e.target.value);
    }

    function handleDurationInput(e) {
        setDuration(e.target.value)
    }

    function callingWCServer(event) {
        event.preventDefault();
        if (duration > showAfterTime) {
            alert("Duration time exceeds interval time, please enter a value lower than the Generate every time.");
            return;
        }
        setSharedData(webSocketConnection(showAfterTime, duration, setSharedData));
    }

    function closeServer(event) {
        event.preventDefault();
        sharedConnection.close();
    }

    return (
    <>
        <div className="updateInputForms">
            <form className="delayInputForm">
                <label>Generate every(s):</label>
                <input name="delayTime" 
                    placeholder="Enter delay time"
                    type="number"
                    value={showAfterTime}
                    onChange={handleDelayInput}
                />
            </form>

            <form className="durationInputForm">
                <label>Duration (s):</label>
                <input name="durationTime" 
                    placeholder="Enter duration time"
                    type="number"
                    value={duration}
                    onChange={handleDurationInput}
                />
            </form>
        </div>

        <div className="startStopButtons">
            <form className="startButton" onSubmit={callingWCServer}>
                <button type="submit">Start</button>
            </form>

            <form className="stopButton" onSubmit={closeServer}>
                <button type="submit">Stop</button>
            </form>
        </div>
        
    </>
    )
}

export default UpdateInput;