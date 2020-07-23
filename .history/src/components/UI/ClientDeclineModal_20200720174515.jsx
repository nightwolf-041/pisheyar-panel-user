import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'

const ClientDeclineModal = (props) => {

    return (
        <div className={!props.hidden ? classes.acceptModal : classes.acceptModalHidden}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideClientAcceptModal}
            className={classes.contractAcceptModalCloseIcon} />
            <h4 className={classes.acceptModalTitle}>آیا مطمئن به لغو هستید ؟</h4>
            <div className={classes.acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                disabled={props.disable}
                onClick={() => props.declineOrderHandler()}>
                    انصراف
            </button>
            <button className={classes.acceptModalButton}
                disabled={props.disable}
                onClick={() => props.acceptOrderHandler()}>
                    لغو کردن
            </button>
            </div>
        </div>
    )
}

export default ClientDeclineModal
