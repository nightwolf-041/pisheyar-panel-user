import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCashRegister, faEdit } from '@fortawesome/free-solid-svg-icons'
import classes from './sidebarControlers.module.css'

function SidebarControlers(props) {
    return (
        <div className={classes.sidebarControlers}>
            <div className={classes.sidebarControlersCloseIconBox} onClick={props.logout}>
                <p>خروج</p>
                <FontAwesomeIcon icon={faTimes} className={classes.sidebarControlersCloseIcon} />
            </div>
            <div className={classes.sidebarControlersRight}>
                <div className={classes.sidebarControlersRightIconBox}>
                    <p>ویرایش</p>
                    <FontAwesomeIcon icon={faEdit}
                    className={classes.sidebarControlersCloseIcon} />
                </div>
                {
                    props.charge ?
                    <div className={classes.sidebarControlersRightIconBox}
                    onClick={props.showPaymentModalModal}>
                        <p>شارژ</p>
                        <FontAwesomeIcon icon={faCashRegister}
                        className={classes.sidebarControlersCloseIcon} />
                    </div> 
                    : null
                }
            </div>
        </div>
    )
}

export default SidebarControlers
