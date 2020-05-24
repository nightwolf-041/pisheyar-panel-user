import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faPaperclip, faArrowLeft, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'

const ContractAcceptModal = (props) => {
    return (
        <div className={!props.hidden ? classes.contractAcceptModal : classes.contractAcceptModalHidden}>
            <FontAwesomeIcon icon={} className={classes.contractAcceptModalCloseIcon} />
            <h4 className={classes.acceptModalTitle}>آیا مطمئن به کار هستید ؟</h4>
            <textarea placeholder="گفتگوی متخصص"
            className={classes.contractAcceptModalTextarea}>
            </textarea>
            <input placeholder="قیمت پیشنهادی" className={classes.contractAcceptModalInput} />
            <div className={classes.acceptModalButtonsBox}>
            <button className={classes.acceptModalButton}
                onClick={props.hideContractAcceptModal}>رد کردن</button>
                <button className={classes.acceptModalButton}>قبول کردن</button>
            </div>
        </div>
    )
}

export default ContractAcceptModal
