import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import classes from './paymentPage.module.css'

function PaymentPage(props) {

    let [paymentState, setPaymentState] = useState()

    useEffect(() => {
        console.log(props.location);
        // if(props.location.query !== undefined || props.location.query !== null) {
        //     setPaymentState(props.location.query.result)
        // }else{
        //     props.history.replace('/')
        // }
    }, [])

    const redirectToHome = () => {
        props.history.replace('/')
    }

    return (
        <div className={classes.paymentPageMain}>
            {
                paymentState === 'successful' ?
                <h2 className={classes.paymentPageResultSuccess}>
                    پرداخت موفق بود
                </h2>
                :
                <h2 className={classes.paymentPageResultFail}>
                    پردخت ناموفق بود
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
