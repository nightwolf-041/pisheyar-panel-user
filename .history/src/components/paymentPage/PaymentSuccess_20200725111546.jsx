import React from 'react'

function PaymentSuccess() {
    return (
        <div className={classes.paymentSuccessBox}>
            <img src={successImg} alt="success" className={classes.paymentSuccessImage} />
            <h2 className={classes.paymentPageResultSuccess}>
                پرداخت شما با موفقیت انجام شد
            </h2>
            <h2 className={classes.paymentPageResultSuccess}>
                {query.get("trackingToken")}
            </h2>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaymentSuccess
