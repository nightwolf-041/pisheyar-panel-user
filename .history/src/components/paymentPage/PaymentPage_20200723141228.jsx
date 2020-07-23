import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import classes from './paymentPage.module.css'

function PaymentPage(props) {

    const paymentState = props.location.query.result

    useEffect(() => {
        if(paymentState === null || paymentState === undefined) {
            // props.history.replace('/')
        }
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
