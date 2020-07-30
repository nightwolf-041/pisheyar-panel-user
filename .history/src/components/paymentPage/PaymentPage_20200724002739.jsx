import React, {useEffect, useState} from 'react'
import {withRouter, useLocation} from 'react-router-dom'
import classes from './paymentPage.module.css'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaymentPage(props) {

    let query = useQuery();
    let [paymentState, setPaymentState] = useState(query.get("result"))
    let [paymentState, setPaymentState] = useState(query.get("result"))

    useEffect(() => {
        console.log(props.location.search);
        if(props.location.search !== undefined && props.location.search !== null) {
            console.log(paymentState)
            console.log(props.location.query)
            console.log(props.match.params)
            setPaymentState(props.location.search)
        }else{
            // props.history.replace('/')
        }
        // if(props.match.params !== undefined && props.match.params !== null) {
        //     if(props.match.params.result !== undefined && props.match.params.result !== null) {
        //         setPaymentState(props.location.query.result)
        //     }
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
                paymentState === "?result=successful" ?
                <h2 className={classes.paymentPageResultSuccess}>
                    پرداخت موفق بود
                </h2>
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
