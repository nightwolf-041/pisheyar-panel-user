import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons'
import classes from './header.module.css'

import pisheyarLogo from '../../assets/images/pisheyar-single-white.png'


const Header = () => {
    return (
        <header className={classes.header}>
           <div className={classes.headerContainer}>
            <div className={classes.headerNotificationsBox}>
                    <div className={classes.headerNotification}>
                        <FontAwesomeIcon icon={faPlus}
                        className={classes.headerNotificationIcon} />
                    </div>
                    <div className={classes.headerNotification}>
                        <FontAwesomeIcon icon={faEnvelope}
                        className={classes.headerNotificationIcon} />
                    </div>
                    <div className={classes.headerNotification}>
                        <FontAwesomeIcon icon={faBell}
                        className={classes.headerNotificationIcon} />
                    </div>
                </div>
                <div className={classes.headerTitleBox}>پیشه یار</div>
                <div className={classes.headerLogoBox}>
                    <img src={pisheyarLogo} alt="pisheyar" />
                </div>
           </div>
        </header>
    )
}

export default Header
