import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import classes from './header.module.css'

import pisheyarLogo from '../../assets/images/pisheyar-single-white.svg'


const Header = () => {
    return (
        <header className={classes.header}>
           <div className={classes.headerContainer}>
            <div className={classes.headerNotificationsBox}>
                    <div className={classes.headerNotificationKeeper}>
                        <div className={classes.headerNotification}>
                            <FontAwesomeIcon icon={faPlus}
                            className={classes.headerNotificationIcon} />
                        </div>
                    </div>
                    <div className={classes.headerNotificationKeeper}>
                        <div className={classes.headerNotificationBadge}>2</div>
                        <div className={classes.headerNotification}>
                            <FontAwesomeIcon icon={faEnvelope}
                            className={classes.headerNotificationIcon} />
                        </div>
                    </div>
                    <div className={classes.headerNotificationKeeper}>
                        <div className={classes.headerNotificationBadge}>2</div>
                        <div className={classes.headerNotification}>
                            <FontAwesomeIcon icon={faBell}
                            className={classes.headerNotificationIcon} />
                        </div>
                    </div>
                </div>
                <div className={classes.headerLogoBoxMobile}>
                    <img src={pisheyarLogo} alt="pisheyar" />
                </div>
                <div className={classes.headerTitleBox}>پیشه یار</div>
                <div className={classes.headerLogoBox}>
                    <img src={pisheyarLogo} alt="pisheyar" />
                </div>
                <FontAwesomeIcon icon={faBars} className={classes.hamburgerMenuIcon} />
           </div>
        </header>
    )
}

export default Header
