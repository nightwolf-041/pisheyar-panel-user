import React from 'react';
import classes from './chatLeftMessage.module.css'

const ChatLeftMessage = (props) => {
    return (
        <div className={classes.chatboxMainContentSendedLeft}>
            <div className={classes.chatboxMainContentSendedLeftDesc}>
                <p className={classes.ChatboxMainContentSendedLeftDescText}>
                    {props.message}
                </p>
                <span className={classes.ChatboxMainContentSendedLeftDescDate}>
                    {props.date}
                </span>
            </div>
            <div className={classes.chatboxMainContentSendedLeftProfbox}>
                <img src={props.image} alt=""
                className={classes.chatboxMainContentSendedLeftProfile} />
            </div>
        </div>
    )
}

export default ChatLeftMessage
