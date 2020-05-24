import React from 'react'
import classes from './ui.module.css'

const ClientAcceptModal = (props) => {
    return (
        <div className={!props.hidden ? classes.acceptModal : classes.acceptModalHidden}>
            <h4>آیا مطمئن به کار هستید ؟</h4>
            <div className={classes.acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                onClick={props.hidePersonacceptModal}>رد کردن</button>
                <button className={classes.acceptModalButton}>قبول کردن</button>
            </div>
        </div>
    )
}

export default ClientAcceptModal
