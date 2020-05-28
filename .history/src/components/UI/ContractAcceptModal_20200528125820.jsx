import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './ui.module.css'


const ContractAcceptModal = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [contractorMessage, setContractorMessage] = React.useState()
    const [contractorMessageValid, setContractorMessageValid] = React.useState()
    const [contractorOfferedPrice, setContractorOfferedPrice] = React.useState()
    const [contractorOfferedPriceValid, setContractorOfferedPriceValid] = React.useState()

    const orderRequestCreate = () => {
        console.log(props.orderGuid);

        if(contractorMessage === '' || contractorMessage === ' ') {
            setContractorMessageValid(false)
        }

        if(contractorOfferedPrice === '' || contractorOfferedPrice === ' ') {
            setContractorOfferedPriceValid(false)
        }

        if(contractorMessage === '' && contractorMessage === ' ' 
        && contractorOfferedPrice === '' && contractorOfferedPrice === ' ') {

            setContractorMessageValid(true)
            setContractorOfferedPriceValid(true)

            axios.post('http://185.94.97.164/api/OrderRequest/Create', {
                orderGuid: props.orderGuid,
                message: contractorMessage,
                offeredPrice: contractorOfferedPrice
            }, {
                headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                console.log(res);
            })
        }
    }

    const contractorMsgChangeHandler = e => {
        setContractorMessage(e.target.value)
    }

    const contractorPriceChangeHandler = e => {
        setContractorOfferedPrice(e.target.value)
    }


    return (
        <div className={!props.hidden ? classes.contractAcceptModal : classes.contractAcceptModalHidden}>
            <FontAwesomeIcon icon={faTimes}
            onClick={props.hideContractAcceptModal}
            className={classes.contractAcceptModalCloseIcon} />
            <h4 className={classes.contractAcceptModalTitle}>جوشکاری صنعتی</h4>
            <textarea onChange={e => contractorMsgChangeHandler(e)}
            value={contractorMessage}
            placeholder="گفتگوی متخصص"
            className={contractorMessageValid ? 
                classes.contractAcceptModalTextarea :
                classes.contractAcceptModalTextareaInvalid }>
            </textarea>
            <input onChange={e => contractorPriceChangeHandler(e)}
            value={contractorOfferedPrice}
            placeholder="قیمت پیشنهادی"
            className={contractorOfferedPriceValid ?
                classes.contractAcceptModalInput :
                classes.contractAcceptModalInputInvalid}
            />
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
