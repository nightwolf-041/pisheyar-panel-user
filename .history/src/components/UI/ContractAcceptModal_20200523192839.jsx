import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'

const ContractAcceptModal = (props) => {
    return (
        <div className={!props.hidden ? classes.contractAcceptModal : classes.contractAcceptModalHidden}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideContractAcceptModal}
            className={classes.contractAcceptModalCloseIcon} />
            <h4 className={classes.contractAcceptModalTitle}>آیا مطمئن به کار هستید ؟</h4>
            <textarea placeholder="گفتگوی متخصص"
            className={classes.contractAcceptModalTextarea}>
            </textarea>
            <input placeholder="قیمت پیشنهادی" className={classes.contractAcceptModalInput} />
            <div className={classes.contractAcceptModalButtonsBox}>
            <button className={classes.contractAcceptModalButton}
            onClick={props.hideContractAcceptModal}>
                رد کردن
            </button>
            <button className={classes.contractAcceptModalButton}>
                قبول کردن
            </button>
            </div>
        </div>
    )
}

export default ContractAcceptModal
