import React, {useEffect, useState} from 'react'
import {withRouter, useLocation} from 'react-router-dom'
import classes from './paymentPage.module.css'

import successImg from '../../assets/images/success-img.png'
import failImg from '../../assets/images/fail-img.png'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaymentPage(props) {

    let query = useQuery();

    useEffect(() => {
        if(query.get("result") === undefined || query.get("result") === null){
            // props.history.replace('/')
        }
    }, [])

    const redirectToHome = () => {
        props.history.replace('/')
    }

    return (
        <div className={classes.paymentPageMain}>
            {
                query.get("result") === "successful" ?
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
                :
                <h2 className={classes.paymentPageResultFail}>
                    پرداخت ناموفق بود
                </h2>
            }
            <button type="button" className={classes.paymentPageButton}
            onClick={redirectToHome}>
                بازگشت به صفحه اصلی
            </button>
        </div>
    )
}

export default withRouter(PaymentPage)
