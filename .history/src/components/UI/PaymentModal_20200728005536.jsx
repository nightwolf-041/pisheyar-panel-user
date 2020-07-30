
import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import classes from './ui.module.css'
import { Redirect } from 'react-router';


const PaymentModal = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [loading, setLoading] = React.useState(false)
    const [paymentValue, setPaymentValue] = React.useState('')
    const [paymentValueValid, setPaymentValueValid] = React.useState(true)
    const [paymentDiscountValue, setPaymentDiscountValue] = React.useState('')
    
    const [lastVlue, setLastVlue] = React.useState('')

    React.useEffect(() => {
        if(props.hidden === true) {
            setPaymentValue('')
            setPaymentValueValid(true)
            setPaymentDiscountValue('')
        }
    }, [])

    const paymentSend = () => {
        let reg = /^\d+$/;

        setPaymentValueValid(true)

        if( reg.test(paymentValue) && paymentValue.length > 3 ) {

            setPaymentValueValid(true)
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
                    toast('در حال هدایت به درگاه پرداخت', {type: toast.TYPE.SUCCESS})
                    window.location.href = res.data.paymentUrl

                }
                if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4 || res.data.state === 5 ) {
                    toast(res.data.message, {type: toast.TYPE.ERROR})
                }
            }).catch(err => {
                setLoading(false)
                toast('خطای شبکه', {type: toast.TYPE.ERROR})
            })
        }else if(!reg.test(paymentValue) && paymentValue.length > 3) {
            setPaymentValueValid(false)
            setTimeout(() => {
                setPaymentValueValid(true)
            }, 850)
            toast('مقدار ورودی نامعتبر است', {type: toast.TYPE.ERROR})
        }else{
            setPaymentValueValid(false)
            setTimeout(() => {
                setPaymentValueValid(true)
            }, 850)
            toast('لطفا مبلغ را وارد کنید', {type: toast.TYPE.ERROR})
        }
    }

    const paymentValueChangeHandler = e => {
        setPaymentValue(e.target.value)
        setLastVlue(e.target.value)
    }

    const paymentDiscountValueChangeHandler = e => {
        setPaymentDiscountValue(e.target.value)
    }

    const getPaidAmount = () => {
        axios.post('http://185.211.59.237/Payment/GetPaidAmount', {
            
        })
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

                <div className={classes.paymentDiscountValueBox}>
                    <input onChange={e => paymentDiscountValueChangeHandler(e)}
                    value={paymentDiscountValue}
                    placeholder="کد تخفیف"
                    className={classes.paymentDiscountInput}
                    />
                    <button className={classes.paymentDiscountButton}
                    onClick={getPaidAmount}>
                        اعمال
                    </button>
                </div>

                <p className={classes.paymentFinalValueTitle}>قیمت نهایی</p>
                <p className={classes.paymentFinalValue}>
                    {paymentValue}
                </p>
                
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
