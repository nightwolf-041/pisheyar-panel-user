import React from 'react'
import classes from './ui.module.css'

import googlePlay from '../../assets/images/GooglePlay.png'
import appstore from '../../assets/images/Appstore.png'
import sibapp from '../../assets/images/Sibapp.png'
import bazaar from '../../assets/images/Bazaar.png'

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
                        <img src={googlePlay} alt="گوگل پلی"
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src={appstore} alt="اپ استور"
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src={sibapp} alt="سیب اپ"
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                    <a href="gooooooogleplay"
                    className={classes.contractorLoginModalLinksBoxImageLink}>
                        <img src={bazaar} alt="بازار"
                        className={classes.contractorLoginModalLinksBoxImage} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ContractorLoginModal
