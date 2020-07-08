import React from 'react'
import classes from './ui.module.css'

const ContractorLoginModal = (props) => {

    return (
        <>
            {!props.hidden ?
                <div className={classes.contractorLoginModalBackdrop}
                onClick={props.hideHandler}></div>
                : null
            }
            <div className={!props.hidden ? classes.contractorLoginModal : classes.contractorLoginModalHidden}>
                <h4 className={classes.contractorLoginModalTitle}>
                    ثبت نام متخصص صرفا از طریق اپلیکیشن انجام پذیر می‌باشد، جهت دریافت اپلیکیشن از راه های زیر اقدام کنید.
                </h4>
                <div className={classes.contractorLoginModalButtonsBox}>
                    <a href={currentIndex === 0 ? "googleplay" : "gooooooogleplay"}
                    className={classes.appPageRightSocialImageLink}>
                        <img src="/GooglePlay.png" alt=""
                        className={classes.appPageRightSocialImage} />
                    </a>
                    <a href={currentIndex === 0 ? "googleplay" : "gooooooogleplay"}
                    className={classes.appPageRightSocialImageLink}>
                        <img src="/Appstore.png" alt=""
                        className={classes.appPageRightSocialImage} />
                    </a>
                    <a href={currentIndex === 0 ? "googleplay" : "gooooooogleplay"}
                    className={classes.appPageRightSocialImageLink}>
                        <img src="/Sibapp.png" alt=""
                        className={classes.appPageRightSocialImage} />
                    </a>
                    <a href={currentIndex === 0 ? "googleplay" : "gooooooogleplay"}
                    className={classes.appPageRightSocialImageLink}>
                        <img src="/Bazaar.png" alt=""
                        className={classes.appPageRightSocialImage} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ContractorLoginModal
