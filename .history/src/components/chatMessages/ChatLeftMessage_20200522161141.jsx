import React from 'react'
import './chatMessages.css'

const ChatLeftMessage = () => {
    return (
        <div className="chatbox-main-content-sended-right">
            <div className="chatbox-main-content-sended-right-desc">
                <p className="chatbox-main-content-sended-right-desc-text">
                    باشه
                </p>
                <span className="chatbox-main-content-sended-right-desc-date">
                    1399/8/24 pm
                </span>
            </div>
            <div className="chatbox-main-content-sended-right-profbox">
                <img src={amooLogo} alt="" className="chatbox-main-content-sended-right-profile" />
            </div>
        </div>
    )
}

export default ChatLeftMessage
