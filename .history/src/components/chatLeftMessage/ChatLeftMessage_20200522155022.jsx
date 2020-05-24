import React from 'react'

const ChatLeftMessage = () => {
    return (
        <div className="chatbox-main-content-sended-left">
            <div className="chatbox-main-content-sended-left-desc">
                <p className="chatbox-main-content-sended-left-desc-text">
                    بمونه پس فردا
                </p>
                <span className="chatbox-main-content-sended-left-desc-date">
                    1395/8/15 pm
                </span>
            </div>
            <div className="chatbox-main-content-sended-left-profbox">
                <img src={rubyLogo} alt="" className="chatbox-main-content-sended-left-profile" />
            </div>
        </div>
    )
}

export default ChatLeftMessage
