import React from 'react'
import failImg from '../../assets/images/fail-img.png'
import classes from './paymentPage.module.css'

function PaumentFail(props) {
    return (
        <div className={classes.paymentFailBox}>
        <div className={classes.paymentFailBoxTop}>
            <img src={failImg} alt="fail" className={classes.paymentFailImage} />
            <h2 className={classes.paymentPageResultFailTitle}>
                نا موفق!
            </h2>
            <h2 className={classes.paymentPageResultFailSubtitle}>
                متاسفانه پرداخت با مشکل مواجه شده.
            </h2>
        </div>
        <button type="button" className={classes.paymentFailButton}
        onClick={props.redirectToHome}>
            تایید
        </button>
    </div>
    )
}

export default PaumentFail
