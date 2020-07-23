import React from 'react'
import {withRouter} from 'react-router-dom'
import classes from './paymentPage.module.css'

function PaymentPage(props) {

    const paymentState = props.location.query.result

    return (
        <div className={classes.paymentPageMain}>
            <h2 className={classes.paymentPageResult}>
                {paymentState === true}
            </h2>
        </div>
    )
}

export default withRouter(PaymentPage)
