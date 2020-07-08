import React from 'react'
import classes from './ui.module.css'

const ContractorLoginModal = (props) => {

    return (
        <>
            {!props.hidden ?
                <div className={classes.contractorLoginModalBackdrop}
                onClick={props.hide}></div>
                : null
            }
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
