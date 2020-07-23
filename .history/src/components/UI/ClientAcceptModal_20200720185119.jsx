import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'

const ClientAcceptModal = (props) => {

    return (
        <>
        <div className={!props.hidden ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}
        onClick={props.hideClientAcceptModal}>
        </div>
        <div className={!props.hidden ? classes.acceptModal : classes.acceptModalHidden}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideClientAcceptModal}
            className={classes.contractAcceptModalCloseIcon} />
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
        </>
    )
}

export default ClientAcceptModal
