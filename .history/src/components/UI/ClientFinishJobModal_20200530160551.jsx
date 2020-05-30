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
        </div>
    )
}

export default ClientFinishJobModal
