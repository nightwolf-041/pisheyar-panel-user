import React from 'react'
import classes from './ordersPage.module.css'


const OrdersPage = () => {
    return (
        <div className={classes.ordersPageMain}>
            <div className={classes.orderPageItem}>
                <h4 className={classes.orderPageItemTitle}>جوشکاری صنعتی</h4>
                <div className={classes.orderPageItemDescBox}></div>
            </div>
        </div>
    )
}

export default OrdersPage
