import React from 'react'
import classes from './ui.module.css'

const ContractAcceptModal = (props) => {
    return (
        <div className={!props.hidden ? classes.acceptModal : classes.acceptModalHidden}>
            <h4 className={classes.acceptModalTitle}>آیا مطمئن به کار هستید ؟</h4>
            <div className={classes.acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                onClick={props.hideContractAcceptModal}>رد کردن</button>
                <button className={classes.acceptModalButton}>قبول کردن</button>
            </div>
        </div>
    )
}

export default ContractAcceptModal
