import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import classes from './contractorResume.module.css'

import avatar from '../../assets/images/male.png'

const ContractorResume = (props) => {
    return (
        <div className={classes.resumeMain}>
             <PerfectScrollbar>
                <div className={classes.resumeBackButtonBox} onClick={props.hideResumePage}>
                    <FontAwesomeIcon icon={faArrowRight}
                    className={classes.resumeBackButtonIocn} /> 
                </div>
                <div className={classes.resumeContent}>
                    <div className={classes.resumeContentImageBox}>
                        <img src={avatar} alt="" className={classes.resumeContentImage} />
                    </div>
                    <h4 className={classes.resumeContentTitle}>روزبه شامخی</h4>
                    <p className={classes.resumeContentSubtitle}>مهندس کامپیوتر</p>

                <div className={classes.resumeContentRateBox}>
                    <span className={classes.resumeContentRateBoxLeft}>5.7</span>
                    <span className={classes.resumeContentRateBoxMidd}>/</span>
                    <span className={classes.resumeContentRateBoxRight}>6</span>
                </div>
                <div className={classes.resumeContentInfo}>
                    <span className={classes.resumeContentInfoTitle}>جزئیات</span>
                    <div className={classes.resumeContentInfoItem}>
                        شهر های تحت پوشش: کرج ـ تهران تا قسمتی ابری ـ فردیس ـ قسمت هایی از محمد شهر
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        آدرس: سرزمین میانه، موردور، پشت کوه آتش
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        شماره: 09147830093
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        شبکه اجتماعی: hmd_945_as
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        ویژگی: خوشگل و خوش رفتار ـ سر وقت و آنتایم ـ ناناس و تو دل برو
                    </div>
                </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default ContractorResume
