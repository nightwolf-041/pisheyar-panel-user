import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import classes from './ui.module.scss'


const OrderCreateModal = (props) => {

    // const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = React.useState(false)
    const [orderCreateMessage, setOrderCreateMessage] = React.useState('')
    const [orderCreateMessageValid, setOrderCreateMessageValid] = React.useState(true)
    const [orderCreateTitle, setOrderCreateTitle] = React.useState('')
    const [orderCreateTitleValid, setOrderCreateTitleValid] = React.useState(true)

    React.useEffect(() => {
        if(props.hidden === true) {
            setOrderCreateMessage('')
            setOrderCreateMessageValid(true)
            setOrderCreateTitle('')
            setOrderCreateTitleValid(true)
        }
    })

    const orderCreate = () => {

        if(orderCreateMessage.length <= 5) {
            setOrderCreateMessageValid(false)
        }else{
            setOrderCreateMessageValid(true)
        }

        if(orderCreateTitle.length < 4) {
            setOrderCreateTitleValid(false)
        }else{
            setOrderCreateTitleValid(true)
        }

        if(orderCreateMessage.length > 5 && orderCreateTitle.length >= 4) {

            setOrderCreateMessageValid(true)
            setOrderCreateTitleValid(true)
            setLoading(true)

            axios.post('http://185.211.59.237/Order/Create', {
                categoryGuid: props.orderGuid,
                title: orderCreateTitle,
                description: orderCreateMessage
            }).then(res => {
                console.log(res.data)
                setLoading(false)
                if(res.data.state === 1) {
                    props.hideOrderCreateModal()
                    toast('عملیات موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})
                }
                if(res.data.state === 2) {
                    toast('کاربر مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
                }
                if(res.data.state === 3) {
                    toast('سرویس دهنده مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
                }
                if(res.data.state === 4) {
                    toast('سفارش مورد نظر یافت نشد', {type: toast.TYPE.ERROR})
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

    const orderCreateMsgChangeHandler = e => {
        setOrderCreateMessage(e.target.value)
    }

    const orderCreateTitleChangeHandler = e => {
        setOrderCreateTitle(e.target.value)
    }

    


    return (
        <>
            <div className={!props.hidden ? classes.orderCreateModalBackdrop : classes.orderCreateModalBackdropHide}>
            </div>

            <div className={!props.hidden ? classes.orderCreateModal : classes.orderCreateModalHidden}>
                <FontAwesomeIcon icon={faTimes}
                onClick={props.hideOrderCreateModal}
                className={classes.orderCreateModalCloseIcon} />
                <h4 className={classes.orderCreateModalLabel}>
                    ثبت سفارش در {props.orderCreateModalLabel}
                </h4>
                <input onChange={e => orderCreateTitleChangeHandler(e)}
                value={orderCreateTitle}
                placeholder="عنوان"
                className={orderCreateTitleValid ?
                    classes.orderCreateModalTitle :
                    classes.orderCreateModalTitleInvalid}
                />
                <textarea onChange={e => orderCreateMsgChangeHandler(e)}
                value={orderCreateMessage}
                placeholder="توضیحات"
                className={orderCreateMessageValid ? 
                    classes.orderCreateModalTextarea :
                    classes.orderCreateModalTextareaInvalid }>
                </textarea>
                <div className={classes.orderCreateModalButtonsBox}>
                    <button className={classes.orderCreateModalButton}
                    disabled={loading}
                    onClick={() => orderCreate()}>
                        ثبت سفارش
                    </button>
                </div>
            </div>

            <ToastContainer
            autoClose={4000}
            position={toast.POSITION.BOTTOM_CENTER}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnVisibilityChange={false}
            pauseOnHover={false}
            rtl/>
        </>
    )
}

export default OrderCreateModal
