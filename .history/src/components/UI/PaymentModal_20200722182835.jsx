
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
        axios.get('http://185.211.59.237/Category/c265fd02-0194-4d38-83e8-a93bc3698fcc?includeChildren=true', {
            headers: { Authorization: "Bearer " + cookies.token }
        })
        .then(res => {
            console.log(res.data);
            if(res.data.state === 1) {
                setCategoriesLoading(false)
                setCategories(res.data.category.children)
                setSelectedCategory(res.data.category.children[0])
            }else{
                // setCategoriesLoading(false)
                // toast(res.data.message, {type: toast.TYPE.ERROR})
            }
        }).catch(err => {
            // setCategoriesLoading(false)
            // toast('', {type: toast.TYPE.ERROR})
        })
    }, [])

    const orderCreate = () => {

        if(paymentValue.length <= 5) {
            setPaymentValueValid(false)
        }else{
            setPaymentValueValid(true)
        }

        if(paymentDiscountValue.length < 4) {
            setPaymentDiscountValueValid(false)
        }else{
            setPaymentDiscountValueValid(true)
        }

        if(paymentValue.length > 5 && paymentDiscountValue.length >= 4) {

            setPaymentValueValid(true)
            setPaymentDiscountValueValid(true)
            setLoading(true)

            axios.post('http://185.211.59.237/Order/Create', {
                categoryGuid: selectedCategory.categoryGuid,
                title: paymentDiscountValue,
                description: paymentValue
            }, {
                headers: { Authorization: "Bearer " + cookies.token }
            }).then(res => {
                console.log(res.data)
                setLoading(false)
                if(res.data.state === 1) {
                    props.hideOrderCreateModal()
                    toast('عملیات موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})
                }
                if(res.data.state === 2 || res.data.state === 3 || res.data.state === 4 || res.data.state === 5 ) {
                    toast(res.data.message, {type: toast.TYPE.ERROR})
                }
            }).catch(err => {
                console.log(err)
                setLoading(false)
                toast('خطای شبکه', {type: toast.TYPE.ERROR})
            })
        }else{
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
        <div className={!props.hidden ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}
         onClick={props.hidePaymentModalModal}>
        </div>
            <div className={!props.hidden ? classes.paymentModalModalBackdrop : classes.paymentModalModalBackdropHide}>
            </div>

            <div className={!props.hidden ? classes.paymentModalModal : classes.paymentModalModalHidden}>
                <FontAwesomeIcon icon={faTimes}
                onClick={props.hidePaymentModalModal}
                className={classes.paymentModalModalCloseIcon} />
                <h4 className={classes.paymentModalModalLabel}>
                    ثبت سفارش در
                </h4>
                <input onChange={e => paymentValueChangeHandler(e)}
                value={paymentModalTitle}
                placeholder="عنوان"
                className={paymentModalTitleValid ?
                    classes.paymentModalTitle :
                    classes.paymentModalTitleInvalid}
                />

                <input onChange={e => paymentDiscountValueChangeHandler(e)}
                value={paymentModalTitle}
                placeholder="عنوان"
                className={paymentModalTitleValid ?
                    classes.paymentModalTitle :
                    classes.paymentModalTitleInvalid}
                />
                
                <div className={classes.paymentModalButtonsBox}>
                    <button className={classes.paymentModalButton}
                    disabled={loading}
                    onClick={() => PaymentSend()}>
                        ثبت سفارش
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaymentModal
