import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './sidebarControlers.module.css'


function SidebarControlers() {
    return (
        <div className={classes.sidebarControlers}>
            <div className={classes.sidebarControlersCloseIconBox}>
                <FontAwesomeIcon icon={faTimes} className={classes.sidebarControlersCloseIcon} />
            </div>
            <div className={classes.sidebarControlersRight}>
                <div className={classes.sidebarControlersRightIconBox}>
                    <FontAwesomeIcon icon={faTimes}
                    className={classes.sidebarControlersCloseIcon} />
                </div>
                <div className={classes.sidebarControlersRightIconBox}>
                    <FontAwesomeIcon icon={faTimes}
                    className={classes.sidebarControlersCloseIcon} />
                </div>
            </div>
        </div>
    )
}

export default SidebarControlers
