import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'


const ContractAcceptModal = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [contractorMessage, setContractorMessage] = React.useState()
    const [contractorOfferedPrice, setContractorOfferedPrice] = React.useState()

    const orderRequestCreate = () => {
        console.log(props.orderGuid);

        axios.post('http://185.94.97.164/api/OrderRequest/Create', {
            orderGuid: props.orderGuid,
            message: contractorMessage,
            offeredPrice: contractorOfferedPrice
        }, {
            headers: { Authorization: "Bearer " + cookies.token }
        }).then(res => {

        })
    }


    return (
        <div className={!props.hidden ? classes.contractAcceptModal : classes.contractAcceptModalHidden}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideContractAcceptModal}
            className={classes.contractAcceptModalCloseIcon} />
            <h4 className={classes.contractAcceptModalTitle}>جوشکاری صنعتی</h4>
            <textarea placeholder="گفتگوی متخصص"
            className={classes.contractAcceptModalTextarea}>
            </textarea>
            <input placeholder="قیمت پیشنهادی" className={classes.contractAcceptModalInput} />
            <div className={classes.contractAcceptModalButtonsBox}>
            <button className={classes.contractAcceptModalButton}
            onClick={props.hideContractAcceptModal}>
                رد کردن
            </button>
            <button className={classes.contractAcceptModalButton}
            onClick={orderRequestCreate}>
                قبول کردن
            </button>
            </div>
        </div>
    )
}

export default ContractAcceptModal
