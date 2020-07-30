import React, {useEffect, useState} from 'react'
import {withRouter, useLocation} from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess'
import PaymentFail from './PaymentFail'
import classes from './paymentPage.module.css'


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
                <PaymentSuccess
                redirectToHome={redirectToHome}
                trackingToken={query.get("trackingToken")} />
                :
                <PaymentFail
                redirectToHome={redirectToHome}
                />
            }
        </div>
    )
}

export default withRouter(PaymentPage)
