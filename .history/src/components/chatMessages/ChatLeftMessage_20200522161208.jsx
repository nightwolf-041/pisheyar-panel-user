import React from 'react'
import './chatMessages.css'

const ChatLeftMessage = () => {
    return (
        <div className="chatbox-main-content-sended-left">
            <div className="chatbox-main-content-sended-left-desc">
                <p className="chatbox-main-content-sended-left-desc-text">
                    باشه
                </p>
                <span className="chatbox-main-content-sended-left-desc-date">
                    1399/8/24 pm
                </span>
            </div>
            <div className="chatbox-main-content-sended-left-profbox">
                <img src={amooLogo} alt="" className="chatbox-main-content-sended-left-profile" />
            </div>
        </div>
    )
}

export default ChatLeftMessage
