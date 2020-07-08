import React from 'react'
import classes from './ui.module.css'

const ContractorLoginModal = (props) => {

    return (
        <>
            <div className={classes.contractorLoginModalBackdrop}></div>
            <div className={!props.hidden ? classes.contractorLoginModal : classes.contractorLoginModalHidden}>
                <h4 className={classes.contractorLoginModalTitle}>
                    جهت ثبت نام متخصص باید وارد اپلیکیشن شوید
                </h4>
                <div className={classes.contractorLoginModalButtonsBox}>
                </div>
            </div>
        </>
    )
}

export default ContractorLoginModal
