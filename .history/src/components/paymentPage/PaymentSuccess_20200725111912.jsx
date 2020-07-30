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
            <h2 className={classes.paymentPageResultSuccess}>
                {props.trackingToken}
            </h2>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={props.redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaymentSuccess
