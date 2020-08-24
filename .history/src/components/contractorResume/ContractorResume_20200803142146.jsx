import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import classes from './contractorResume.module.css'

import avatar from '../../assets/images/male.png'
import Axios from 'axios'

const ContractorResume = (props) => {
    console.log(props.contractorGuid);

    const [cookies, setCookie, removeCookie] = useCookies();
    let [contractorData, setContractorData] = useState([])
    let [contractorProfile, setContractorProfile] = useState('')
    let [contractorBusiness, setContractorBusiness] = useState('')
    let [contractorCity, setContractorCity] = useState('')

    useEffect(() => {
        axios.get(`http://185.211.59.237/Contractor/${props.contractorGuid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data.user);
            setContractorData(res.data.user)
            let profileDoc = {...res.data.user.profileDocument}
            setContractorProfile(profileDoc.source)
            let business = {...res.data.user.business}
            setContractorBusiness(business.name)
            let city = {...res.data.user.city}
            setContractorCity(city.name)
        })
    }, [])

    return (
        <div className={classes.resumeMain}>
             <PerfectScrollbar>
                <div className={classes.resumeBackButtonBox} onClick={props.hideResumePage}>
                    <FontAwesomeIcon icon={faArrowRight}
                    className={classes.resumeBackButtonIocn} /> 
                </div>
                <div className={classes.resumeContent}>
                    <div className={classes.resumeContentImageBox}>
                        <img src={contractorProfile} alt=""
                        className={classes.resumeContentImage} />
                    </div>
                    <h4 className={classes.resumeContentTitle}>
                        {contractorData.firstName} {contractorData.lastName}
                    </h4>
                    <p className={classes.resumeContentSubtitle}>
                        {contractorBusiness}
                    </p>

                <div className={classes.resumeContentRateBox}>
                    <span className={classes.resumeContentRateBoxLeft}>
                        {contractorData.averageRate}
                    </span>
                    <span className={classes.resumeContentRateBoxMidd}>/</span>
                    <span className={classes.resumeContentRateBoxRight}>5</span>
                </div>
                <div className={classes.resumeContentInfo}>
                    <span className={classes.resumeContentInfoTitle}>جزئیات</span>
                    <div className={classes.resumeContentInfoItem}>
                        شهر تحت پوشش: {contractorCity}
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        آدرس: {contractorData.address}
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        شماره: {contractorData.telephone}
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        شبکه اجتماعی: {contractorData.instagram}
                    </div>
                    <div className={classes.resumeContentInfoItem}>
                        ویژگی: {contractorData.aboutMe}
                    </div>
                </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default ContractorResume
