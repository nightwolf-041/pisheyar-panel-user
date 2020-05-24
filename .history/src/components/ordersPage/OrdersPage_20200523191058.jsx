import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ordersPage.module.css'


const OrdersPage = () => {
    return (
        <div className={classes.ordersPageMain}>
             <PerfectScrollbar>
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
                        <button className={classes.orderPageItemLeftIgnoreButton}>
                            <FontAwesomeIcon icon={faTimes}
                            className={classes.orderPageItemLeftIgnoreIcon} />
                        </button>
                        <button className={classes.orderPageItemLeftAcceptButton}>
                            <FontAwesomeIcon icon={faCheck}
                            className={classes.orderPageItemLeftAcceptIcon} />
                        </button>
                    </div>
                </div>
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
                        <button className={classes.orderPageItemLeftIgnoreButton}>
                            <FontAwesomeIcon icon={faTimes}
                            className={classes.orderPageItemLeftIgnoreIcon} />
                        </button>
                        <button className={classes.orderPageItemLeftAcceptButton}>
                            <FontAwesomeIcon icon={faCheck}
                            onClick={props.showContractorModal}
                            className={classes.orderPageItemLeftAcceptIcon} />
                        </button>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default OrdersPage
