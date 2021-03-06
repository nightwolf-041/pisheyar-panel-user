
import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import classes from './ui.module.css'


const PaymentModal = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [loading, setLoading] = React.useState(false)
    const [paymentValue, setPaymentValue] = React.useState('')
    const [paymentValueValid, setPaymentValueValid] = React.useState(true)
    const [paymentDiscountValue, setPaymentDiscountValue] = React.useState('')
    const [paymentDiscountValueValid, setPaymentDiscountValueValid] = React.useState(true)

    React.useEffect(() => {
        if(props.hidden === true) {
            setPaymentValue('')
            setPaymentValueValid(true)
            setPaymentDiscountValue('')
            setPaymentDiscountValueValid(true)
        }
    }, [])

    const paymentSend = () => {
        let reg = /^\d+$/;

        setPaymentValueValid(true)
        setPaymentDiscountValueValid(true)

        if(paymentValue.length > 5 && paymentDiscountValue.length >= 4) {

            setPaymentValueValid(true)
            setPaymentDiscountValueValid(true)
            setLoading(true)

            axios.post('http://185.211.59.237/Payment/Create', {
                cost: paymentValue,
                discountCode: paymentDiscountValue
            }, {
                headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                console.log(res.data)
                setLoading(false)
                if(res.data.state === 1) {
                    props.hidePaymentModalModal()
                    toast('عملیات موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})
                }
                if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4 || res.data.state === 5 ) {
                    toast(res.data.message, {type: toast.TYPE.ERROR})
                }
            }).catch(err => {
                setLoading(false)
                toast('خطای شبکه', {type: toast.TYPE.ERROR})
            })
        }else if(!reg.test(paymentValue) && paymentValue.length > 5) {
            toast('مقدار ورودی نامعتبر است', {type: toast.TYPE.ERROR})
        }else{
            setPaymentValueValid(false)
            setPaymentDiscountValueValid(false)
            toast('لطفا ورودی ها را پر کنید', {type: toast.TYPE.ERROR})
        }
    }

    const paymentValueChangeHandler = e => {
        setPaymentValue(e.target.value)
    }

    const paymentDiscountValueChangeHandler = e => {
        setPaymentDiscountValue(e.target.value)
    }

    return (
        <>
            <div className={!props.hidden ?
            classes.uiModalsBackdrop :
            classes.uiModalsBackdropHidden}
            onClick={props.hidePaymentModalModal}>
            </div>

            <div className={!props.hidden ? classes.paymentModalModal : classes.paymentModalModalHidden}>
                <FontAwesomeIcon icon={faTimes}
                onClick={props.hidePaymentModalModal}
                className={classes.paymentModalModalCloseIcon} />

                <h4 className={classes.paymentModalModalLabel}>
                    شارژ حساب
                </h4>

                <input onChange={e => paymentValueChangeHandler(e)}
                value={paymentValue}
                placeholder="مقدار"
                className={paymentValueValid ?
                    classes.paymentModalInput :
                    classes.paymentModalInputInvalid}
                />

                <input onChange={e => paymentDiscountValueChangeHandler(e)}
                value={paymentDiscountValue}
                placeholder="کد تخفیف"
                className={paymentDiscountValueValid ?
                    classes.paymentModalInput :
                    classes.paymentModalInputInvalid}
                />
                
                <div className={classes.paymentModalButtonsBox}>
                    <button className={classes.paymentModalButton}
                    disabled={loading}
                    onClick={() => paymentSend()}>
                        شارژ حساب
                    </button>
                </div>

            </div>
        </>
    )
}

export default PaymentModal
