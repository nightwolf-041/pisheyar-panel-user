import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ordersPage.module.css'


const OrdersPage = () => {
    return (
        <div className={classes.ordersPageMain}>
            <div className={classes.orderPageItem}>
                <div className={classes.orderPageItemRight}>
                    <h4 className={classes.orderPageItemTitle}>جوشکاری صنعتی</h4>
                    <div className={classes.orderPageItemDescBox}>
                        <h4>آدرس: </h4>
                        <p>کرج، بالاتر از کوه آتش، سرزمین الف های شتابان، برش اول</p>
                    </div>
                    <div className={classes.orderPageItemDescBox}>
                        <h4>توسط: </h4>
                        <p>آقای فرودو بگینز</p>
                    </div>
                </div>
                <div className={classes.orderPageItemLeft}>
                    <div className={classes.orderPageItemLeftIgnoreButton}>
                        <div className={classes.orderPageItemLeftIgnoreIconBox}>
                            <FontAwesomeIcon icon={faTimes}
                            className={classes.orderPageItemLeftIgnoreIcon} />
                        </div>
                    </div>
                    <div className={classes.orderPageItemLeftAcceptButton}>
                        <FontAwesomeIcon icon={faCheck}
                        className={classes.orderPageItemLeftAcceptIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage
