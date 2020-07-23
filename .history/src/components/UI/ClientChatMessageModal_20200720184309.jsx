import React from 'react'
import classes from './ui.module.css'

const ClientChatMessageModal = (props) => {
    return (
        <>
        <div className={!props.hidden ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}>
        </div>
        <div className={!props.hidden ? classes.messageModal : classes.messageModalHidden}>
            <h4 className={classes.messageModalTitle}>
                :پیام متخصص
            </h4>
            <p className={classes.messageModalDesc}>
                {props.message}
            </p>
            <div className={classes.messageModalPriceBox}>
                <h4>:قیمت پیشنهادی </h4>
                <p>{props.price}</p>
            </div>
            <div className={classes.messageModalButtonsBox}>
                <button className={classes.messageModalButton}
                onClick={props.hidePersonMessageModal}>رد کردن</button>
                <button className={classes.messageModalButton}
                onClick={() => props.startChatHandler(props.contractor)}>
                    قبول کردن
                </button>
            </div>
        </div>
        </>
    )
}

export default ClientChatMessageModal
