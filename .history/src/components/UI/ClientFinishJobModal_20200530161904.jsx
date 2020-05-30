import React from 'react'
import Rating from 'react-rating'
import classes from './ui.module.css';


function ClientFinishJobModal() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = React.useState(false)
    const [finishMessage, setFinishMessage] = React.useState('')
    const [finishMessageValid, setFinishMessageValid] = React.useState(true)
    const [finishPrice, setFinishPrice] = React.useState('')
    const [finishPriceValid, setFinishPriceValid] = React.useState(true)

    React.useEffect(() => {
        if(props.hidden === true) {
            setFinishMessage('')
            setFinishMessageValid(true)
            setFinishPrice('')
            setFinishPriceValid(true)
        }
    })

    const orderRequestCreate = () => {

        if(contractorMessage.length <= 5) {
            setFinishMessageValid(false)
        }else{
            setFinishMessageValid(true)
        }

        if(contractorOfferedPrice.length < 4) {
            setFinishPriceValid(false)
        }else{
            setFinishPriceValid(true)
        }

        if(contractorMessage.length > 5 && contractorOfferedPrice.length >= 4) {

            setFinishMessageValid(true)
            setFinishPriceValid(true)
            setLoading(true)

            // axios.post('http://185.94.97.164/api/OrderRequest/Create', {
            //     orderGuid: props.orderGuid,
            //     message: contractorMessage,
            //     offeredPrice: contractorOfferedPrice
            // }, {
            //     headers: { Authorization: "Bearer " + cookies.token }
            // }).then(res => {
            //     setLoading(false)
            //     if(res.data.state === 1) {
            //         props.removeOrdeerPageData(props.orderGuid)
            //         toast('عملیات موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})
            //     }
            //     if(res.data.state === 2) {
            //         toast('کاربر مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
            //     }
            //     if(res.data.state === 3) {
            //         toast('سرویس دهنده مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
            //     }
            //     if(res.data.state === 4) {
            //         toast('سفارش مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
            //     }
            // })
        }
    }

    const finishMsgChangeHandler = e => {
        setFinishMessageValid(e.target.value)
    }

    const finishPriceChangeHandler = e => {
        setFinishPriceValid(e.target.value)
    }

    return (
        <div className={classes.clientFinishModal}>
            <textarea
            onChange={e => finishMsgChangeHandler(e)}
            value={contractorMessage}
            placeholder="نظر"
            className={finishMessageValid ? 
                classes.clientFinishModalTextarea :
                classes.clientFinishModalTextareaInvalid }>
            </textarea>
            <input
            onChange={e => finishPriceChangeHandler(e)}
            value={contractorOfferedPrice}
            placeholder="قیمت نهایی"
            className={finishPriceValid ?
                classes.clientFinishModalInput :
                classes.clientFinishModalInputInvalid}
            />
            <h5 className={classes.clientFinishModal}>امتیاز</h5>
            <div className={classes.clientFinishModalRatingBox}>
                <Rating />
            </div>
            <div className={classes.clientFinishModalButtonsBox}>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={props.hideClientFinishModal}>
                    انصراف
                </button>
                <button className={classes.clientFinishModalButton}
                disabled={loading}
                onClick={() => orderRequestCreate()}>
                    اتمام کار
                </button>
            </div>
        </div>
    )
}

export default ClientFinishJobModal
