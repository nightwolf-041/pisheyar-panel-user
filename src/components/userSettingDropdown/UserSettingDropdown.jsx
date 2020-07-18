import React from 'react'
import classes from './userSettingDropdown.module.css'


function UserSettingDropdown() {
    return (
        <div className={classes.userSettingDropdown}>
            <button className={classes.userSettingSettingBtn}>تنظیمات</button>
            <button className={classes.userSettingLogoutBtn}>خروج</button>
        </div>
    )
}

export default UserSettingDropdown
