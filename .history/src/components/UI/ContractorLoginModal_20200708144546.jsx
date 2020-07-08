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
                <div className={classes.contractorLoginModalLinksBox}>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src="/GooglePlay.png" alt=""
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src="/Appstore.png" alt=""
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src="/Sibapp.png" alt=""
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src="/Bazaar.png" alt=""
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ContractorLoginModal
