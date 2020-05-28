import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ordersPage.module.css'


const OrdersPage = (props) => {

    console.log(props.data);


    const renderByState = () => {

        if(props.dataState === 1) {
            return(
                <PerfectScrollbar>
                    {props.data !== null && props.data !== [] && props.data.length > 0 ?
                        props.data.map(data => (
                            <div className={classes.orderPageItem}>
                            <div className={classes.orderPageItemRight}>
                                <h4 className={classes.orderPageItemTitle}>{data.category}</h4>
                                <div className={classes.orderPageItemDescBox}>
                                    <h4>توضیح: </h4>
                                    <p>{data.description}</p>
                                </div>
                                <div className={classes.orderPageItemDescBox}>
                                    <h4>توسط: </h4>
                                    <p>{data.client}</p>
                                </div>
                            </div>
                            <div className={classes.orderPageItemLeft}>
                                <button className={classes.orderPageItemLeftIgnoreButton}>
                                    <FontAwesomeIcon icon={faTimes}
                                    className={classes.orderPageItemLeftIgnoreIcon} />
                                </button>
                                <button className={classes.orderPageItemLeftAcceptButton}
                                    onClick={props.showContractAcceptModal}>
                                    <FontAwesomeIcon icon={faCheck}
                                    className={classes.orderPageItemLeftAcceptIcon} />
                                </button>
                            </div>
                        </div>
                        ))
                        : null
                    }
                </PerfectScrollbar>
            )
        }
    }

    return (
        <div className={classes.ordersPageMain}>
            {renderByState()}
        </div>
    )
}

export default OrdersPage
