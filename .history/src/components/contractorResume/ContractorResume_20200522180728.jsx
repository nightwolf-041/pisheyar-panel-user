import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faSearch, faDownload, faPaperclip, faArrowLeft, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import classes from './contractorResume.module.css'

import rubyRose from '../../assets/images/ruby-rose.jpg'

const ContractorResume = () => {
    return (
        <div className={classes.resumeMain}>
            <div className={resumeBackButtonBox}>

            </div>
            <div className={classes.resumeContent}>
                <img src={rubyRose} alt="" className={classes.resumeContentImage} />
                <h4 className={classes.resumeContentTitle}>روزبه شامخی</h4>
                <p className={classes.resumeContentSubtitle}>مهندس کامپیوتر</p>
            </div>
            <div className={classes.resumeContentRateBox}>

            </div>
        </div>
    )
}

export default ContractorResume
