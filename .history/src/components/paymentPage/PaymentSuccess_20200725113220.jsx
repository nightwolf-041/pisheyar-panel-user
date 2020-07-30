import React from 'react'
import successImg from '../../assets/images/success-img.png'
import classes from './paymentPage.module.css'

function PaymentSuccess(props) {
    return (
        <div className={classes.paymentSuccessBox}>
            <div className={classes.paymentSuccessBoxTop}>
                <img src={successImg} alt="success" className={classes.paymentSuccessImage} />
                <h2 className={classes.paymentPageResultSuccessTitle}>
                    موفق
                </h2>
                <h2 className={classes.paymentPageResultSuccessSubtitle}>
                    پرداخت شما با موفقیت انجام شد
                </h2>
                <div className={classes.paymentPageResultTokenLabelBox}>
                    <p className={classes.paymentPageResultTokenLabel}>کد رهگیری :</p>
                </div>
                <h5 className={classes.paymentPageResultToken}>
                    {props.trackingToken}
                </h5>
            </div>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={props.redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaymentSuccess
