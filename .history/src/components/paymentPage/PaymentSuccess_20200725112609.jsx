import React from 'react'
import successImg from '../../assets/images/success-img.png'
import classes from './paymentPage.module.css'

function PaymentSuccess(props) {
    return (
        <div className={classes.paymentSuccessBox}>
            <img src={successImg} alt="success" className={classes.paymentSuccessImage} />
            <h2 className={classes.paymentPageResultSuccess}>
                پرداخت شما با موفقیت انجام شد
            </h2>
            <div className={classes.paymentPageResultTokenLabelBox}>
                <p className={classes.paymentPageResultTokenLabel}>کد رهگیری :</p>
            </div>
            <h5 className={classes.paymentPageResultToken}>
                {props.trackingToken}
            </h5>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={props.redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaymentSuccess
