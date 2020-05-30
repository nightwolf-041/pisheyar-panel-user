import React from 'react'
import Rating from 'react-rating'
import classes from './ui.module.css';


function ClientFinishJobModal() {
    return (
        <div className={classes.clientFinishModal}>
            <textarea
            onChange={e => contractorMsgChangeHandler(e)}
            value={contractorMessage}
            placeholder="نظر"
            className={contractorMessageValid ? 
                classes.clientFinishModalTextarea :
                classes.clientFinishModalTextareaInvalid }>
            </textarea>
            <input
            onChange={e => contractorPriceChangeHandler(e)}
            value={contractorOfferedPrice}
            placeholder="قیمت نهایی"
            className={contractorOfferedPriceValid ?
                classes.clientFinishModalInput :
                classes.clientFinishModalInputInvalid}
            />
            <Rating />
            <div className={classes.clientFinishModalButtonsBox}>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={props.hideClientFinishModal}>
                    انصراف
                </button>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={() => orderRequestCreate()}>
                    اتمام کار
                </button>
            </div>
        </div>
    )
}

export default ClientFinishJobModal
