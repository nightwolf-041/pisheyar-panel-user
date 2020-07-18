import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import classes from './header.module.css'

import pisheplusLogo from '../../assets/images/logo-plus.svg'


const Header = (props) => {
    return (
        <header className={classes.header}>
           <div className={classes.headerContainer}>
            <div className={classes.headerNotificationsBox}>
                    <div className={classes.headerNotificationKeeper}>
                        {props.client ?
                            <div className={classes.headerNotification}>
                                <FontAwesomeIcon icon={faPlus}
                                onClick={props.showOrderCreate}
                                className={classes.headerNotificationIcon} />
                            </div>
                            : null 
                        }
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
                    <img src={pisheplusLogo} alt="pisheyar" />
                </div>
                <div className={classes.headerTitleBox}>پیشه پلاس</div>
                <div className={classes.headerLogoBox}>
                    <img src={pisheplusLogo} alt="pisheyar" />
                </div>
                <FontAwesomeIcon icon={faBars} className={classes.hamburgerMenuIcon}
                onClick={props.showHamburgerMenu} />
           </div>
        </header>
    )
}

export default Header
