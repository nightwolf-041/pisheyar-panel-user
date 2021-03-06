import React from 'react'
import axios from 'axios'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import classes from './ui.module.css'


const OrderCreateModal = (props) => {

    // const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = React.useState(false)
    const [categoriesLoading, setCategoriesLoading] = React.useState(true)
    const [categories, setCategories] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('')
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
        axios.get('http://185.211.59.237/Category/c265fd02-0194-4d38-83e8-a93bc3698fcc?includeChildren=true')
        .then(res => {
            console.log(res.data);
            if(res.data.state === 1) {
                setCategoriesLoading(false)
                setCategories(res.data.category.children)
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

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          color: state.isSelected ? '#ffd617' : '#0b1033',
          backgroundColor: state.isSelected ? '#0b1033' : 'none',
          padding: 10,
        }),
        placeholder: () => ({
            color: '#cccccc',
            marginBottom: '0.5rem'
        }),
        control: () => ({
            height: '2rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignitems: 'center',
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          const color = '#fff'
      
          return { ...provided, opacity, transition, color };
        }
      }

      const categoriesChanger = val => {
        setSelectedCategory(val)
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
                    ثبت سفارش در
                </h4>
                <Select
                    inputId="orderCreateModalCategories11"
                    instanceId="orderCreateModalCategories12"
                    placeholder="دسته بندی"
                    className={classes.orderCreateModalCategories}
                    // defaultValue={categories[2]}
                    label="Single select"
                    isRtl={true}
                    isLoading={categoriesLoading}
                    loadingMessage={() => "درحال بارگیری..."}
                    noOptionsMessage={() => "نتیجه ای یافت نشد"}
                    styles={customStyles}
                    options={categories}
                    onChange={val => categoriesChanger(val)}
                />
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

            {/* <ToastContainer
            autoClose={4000}
            position={toast.POSITION.TOP_LEFT}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnVisibilityChange={false}
            pauseOnHover={false}
            rtl/> */}
        </>
    )
}

export default OrderCreateModal
