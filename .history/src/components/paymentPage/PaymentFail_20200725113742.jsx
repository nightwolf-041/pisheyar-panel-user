import React from 'react'
import failImg from '../../assets/images/fail-img.png'
import classes from './paymentPage.module.css'

function PaumentFail(props) {
    return (
        <div className={classes.paymentFailBox}>
        <div className={classes.paymentFailBoxTop}>
            <img src={failImg} alt="fail" className={classes.paymentFailImage} />
            <h2 className={classes.paymentPageResultFailTitle}>
                موفق
            </h2>
            <h2 className={classes.paymentPageResultFailSubtitle}>
                پرداخت شما با موفقیت انجام شد
            </h2>
            <div className={classes.paymentPageResultTokenLabelBox}>
                <p className={classes.paymentPageResultTokenLabel}>کد رهگیری :</p>
            </div>
            <h5 className={classes.paymentPageResultToken}>
                {/* {props.trackingToken} */}
                154783464768746
            </h5>
        </div>
        <button type="button" className={classes.paymentFailButton}
        onClick={props.redirectToHome}>
            تایید
        </button>
    </div>
    )
}

export default PaumentFail
