import React from 'react'
import classes from './ui.module.css'

const ClientAcceptModal = (props) => {

    // const acceptOrderHandler = () => {
    //     console.log(props.orderGuid);
    // }

    return (
        <div className={!props.hidden ? classes.acceptModal : classes.acceptModalHidden}>
            <h4 className={classes.acceptModalTitle}>آیا مطمئن به کار هستید ؟</h4>
            <div className={classes.acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                disabled={props.disable}
                onClick={() => props.declineOrderHandler()}>
                    رد کردن
            </button>
            <button className={classes.acceptModalButton}
                disabled={props.disable}
                onClick={() => props.acceptOrderHandler()}>
                    قبول کردن
            </button>
            </div>
        </div>
    )
}

export default ClientAcceptModal
