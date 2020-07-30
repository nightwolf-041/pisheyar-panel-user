import React from 'react'
import failImg from '../../assets/images/fail-img.png'
import classes from './paymentPage.module.css'

function PaumentFail(props) {
    return (
        <div className={classes.paymentFailBox}>
            <img src={FailImg} alt="Fail" className={classes.paymentFailImage} />
            <h2 className={classes.paymentPageResultFail}>
                پرداخت شما با موفقیت انجام شد
            </h2>
            <button type="button" className={classes.paymentSucccessButton}
            onClick={props.redirectToHome}>
                تایید
            </button>
        </div>
    )
}

export default PaumentFail
