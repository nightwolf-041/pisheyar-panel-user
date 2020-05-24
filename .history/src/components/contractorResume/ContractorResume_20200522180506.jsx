import React from 'react'
import classes from './contractorResume.module.css'

import rubyRose from '../../assets/images/ruby-rose.jpg'

const ContractorResume = () => {
    return (
        <div className={classes.resumeMain}>
            <div className={resumeBackButtonBox}>

            </div>
            <div className={classes.resumeContent}>
                <img src={rubyRose} alt="" className={classes.resumeContentImage} />
                <h4>روزبه شامخی</h4>
                <p>مهندس کامپیوتر</p>
            </div>
        </div>
    )
}

export default ContractorResume
