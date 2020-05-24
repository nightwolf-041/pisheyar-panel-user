import React from 'react'
import './chatMessages.css'

const ChatLeftMessage = (props) => {
    return (
        <div className="chatbox-main-content-sended-left">
            <div className="chatbox-main-content-sended-left-desc">
                <p className="chatbox-main-content-sended-left-desc-text">
                    {props.message}
                </p>
                <span className="chatbox-main-content-sended-left-desc-date">
                    {props.date}
                </span>
            </div>
            <div className="chatbox-main-content-sended-left-profbox">
                <img src={props.image} alt="" className="chatbox-main-content-sended-left-profile" />
            </div>
        </div>
    )
}

export default ChatLeftMessage
