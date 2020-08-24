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
    // aboutMe: null
    // address: null
    // averageRate: 3.5
    // business:
    // businessGuid: "09cb21ac-d99e-42ba-904d-337bdd561e6e"
    // name: "به صورت شخصی فعالیت میکنم"
    // __proto__: Object
    // city:
    // cityGuid: "438b9bf9-133c-461f-8e56-b4c61a4e43ea"
    // name: "تهران"
    // __proto__: Object
    // credit: 500
    // email: "dead.hh98@gmail.com"
    // firstName: "حامد"
    // gender: {genderGuid: "6e48b657-2c83-4481-a9c5-009ffe10158b", name: "مرد"}
    // income: 340600
    // instagram: null
    // isActive: true
    // isRegister: true
    // lastName: "حقیقیان"
    // latitude: "111"
    // linkedin: null
    // longitude: "222"
    // phoneNumber: "09108347428"
    // profileDocument: null
    // registeredDate: "1399/05/03 01:15"
    // telegram: null
    // telephone: null
    // userGuid: "84731a8d-5e3f-4556-8d02-c4511254f22d"
    // website: null
    // whatsapp: null

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
                        شماره تلفن: {contractorData.telephone}
                    </div>
                    {contractorData.website &&
                    <div className={classes.resumeContentInfoItem}>
                        وب سایت: {contractorData.website}
                    </div>
                    }
                    {contractorData.telegram &&
                    <div className={classes.resumeContentInfoItem}>
                        تلگرام: {contractorData.telegram}
                    </div>
                    }
                    {contractorData.instagram &&
                    <div className={classes.resumeContentInfoItem}>
                        اینستاگرام: {contractorData.instagram}
                    </div>
                    }
                    {contractorData.whatsapp &&
                    <div className={classes.resumeContentInfoItem}>
                        واتساپ: {contractorData.whatsapp}
                    </div>
                    }
                    {contractorData.linkedin &&
                    <div className={classes.resumeContentInfoItem}>
                        لینکدین: {contractorData.linkedin}
                    </div>
                    }
                    <div className={classes.resumeContentInfoItem}>
                        ویژگی های فردی: {contractorData.aboutMe}
                    </div>
                </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default ContractorResume
