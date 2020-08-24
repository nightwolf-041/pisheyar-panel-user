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
    let [contractorData, setContractorData] = useState()

    useEffect(() => {
        axios.get(`http://185.211.59.237/Contractor/${props.contractorGuid}`, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {
            console.log(res.data.user);
            setContractorData(res.data.user)
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
                        <img src={avatar} alt="" className={classes.resumeContentImage} />
                    </div>
                    <h4 className={classes.resumeContentTitle}>
                        {contractorData.firstName} {contractorData.lastName}
                    </h4>
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
