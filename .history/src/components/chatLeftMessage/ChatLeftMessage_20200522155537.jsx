import React from 'react';
import classes from './chatleftMessage.module.css'

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
            <div className={classes.ChatboxMainContentSendedLeftProfbox}>
                <img src={props.image} alt=""
                className={classes.ChatboxMainContentSendedLeftProfile} />
            </div>
        </div>
    )
}

export default ChatLeftMessage
