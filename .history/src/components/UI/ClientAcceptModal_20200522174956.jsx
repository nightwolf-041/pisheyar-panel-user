import React from 'react'
import classes from './ui.module.css'

const ClientAcceptModal = () => {
    return (
        <div className={classes.acceptModal}>
            <h4></h4>
            <div className={acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                onClick={props.hidePersonacceptModal}>رد کردن</button>
                <button className={classes.acceptModalButton}>قبول کردن</button>
            </div>
        </div>
    )
}

export default ClientAcceptModal
