import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import classes from './contractorResume.module.css'

import rubyRose from '../../assets/images/ruby-rose.jpg'

const ContractorResume = () => {
    return (
        <div className={classes.resumeMain}>
            <div className={resumeBackButtonBox}>
                <FontAwesomeIcon icon={faArrowRight}
                className={classes.resumeBackButtonIocn} /> 
            </div>
            <div className={classes.resumeContent}>
                <img src={rubyRose} alt="" className={classes.resumeContentImage} />
                <h4 className={classes.resumeContentTitle}>روزبه شامخی</h4>
                <p className={classes.resumeContentSubtitle}>مهندس کامپیوتر</p>
            </div>
            <div className={classes.resumeContentRateBox}>
                <span className={classes.resumeContentRateBoxLeft}>5.7</span>
                <span className={classes.resumeContentRateBoxMidd}>/</span>
                <span className={classes.resumeContentRateBoxRight}>6</span>
            </div>
            <div className={classes.resumeContentInfo}>
                
            </div>
        </div>
    )
}

export default ContractorResume
