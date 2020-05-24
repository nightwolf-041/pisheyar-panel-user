import React from 'react'
import './clientChat.css'

const ChatRightMessage = () => {
    return (
        <div className="chatbox-main-content-sended-right">
            <div className="chatbox-main-content-sended-right-desc">
                <p className="chatbox-main-content-sended-right-desc-text">
                    نگی نگفتما بیا بریم
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

export default ChatRightMessage
