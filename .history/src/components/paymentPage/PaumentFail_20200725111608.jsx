import React from 'react'

function PaumentFail() {
    return (
        <div className={classes.paymentFailBox}>
            <img src={FailImg} alt="Fail" className={classes.paymentFailImage} />
            <h2 className={classes.paymentPageResultFail}>
                پرداخت شما با موفقیت انجام شد
            </h2>
            <h2 className={classes.paymentPageResultFail}>
                {query.get("trackingToken")}
            </h2>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaumentFail
