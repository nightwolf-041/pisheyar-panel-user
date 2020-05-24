import React from 'react'
import classes from './ui.module.css'

const ClientChatMessageModal = (props) => {
    return (
        <div className={!props.hidden ? classes.messageModal : classes.messageModalHidden}>
            <h4 className={classes.messageModalTitle}>
                :پیام متخصص
            </h4>
            <p className={classes.messageModalDesc}>
                با سلام و درود بر شما من متخصص در امر تعمیرات در خدمت شما هستم
            </p>
            <div className={classes.messageModalButtonsBox}>
                <button className={classes.messageModalButton}>رد کردن</button>
                <button className={classes.messageModalButton}>قبول کردن</button>
            </div>
        </div>
    )
}

export default ClientChatMessageModal
