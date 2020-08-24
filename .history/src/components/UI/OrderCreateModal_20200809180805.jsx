import React from 'react'
import axios from 'axios'
import Select from 'react-select';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import classes from './ui.module.css'
import '../login/checkbox.css'


const OrderCreateModal = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [loading, setLoading] = React.useState(false)
    const [categoriesLoading, setCategoriesLoading] = React.useState(true)
    const [categories, setCategories] = React.useState([])
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [orderCreateMessage, setOrderCreateMessage] = React.useState('')
    const [orderCreateMessageValid, setOrderCreateMessageValid] = React.useState(true)
    const [orderCreateTitle, setOrderCreateTitle] = React.useState('')
    const [orderCreateTitleValid, setOrderCreateTitleValid] = React.useState(true)
    const [orderCreateTitleAndMessageValid, setOrderCreateTitleAndMessageValid] = React.useState(true)

    const [rulesModalShow, setRulesModalShow] = React.useState(false)

    let [orderRulesCheck, setOrderRulesCheck] = React.useState(false)
    const orderRulesCheckboxChange = () => {
        setOrderRulesCheck(!orderRulesCheck)
        againToggleCheck()
    }
    const againToggleCheck = () => {
        setOrderRulesCheck(!orderRulesCheck)
    }


    React.useEffect(() => {
        if(props.hidden === true) {
            setOrderCreateMessage('')
            setOrderCreateMessageValid(true)
            setOrderCreateTitle('')
            setOrderCreateTitleValid(true)
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
            }
        }).catch(err => {
        })
    }, [])

    const orderCreate = () => {

        if(orderCreateMessage.length <= 5 && orderCreateTitle.length < 4) {
            setOrderCreateTitleAndMessageValid(false)
            setTimeout(() => {
                setOrderCreateTitleAndMessageValid(true)
            }, 850)
            toast('لطفا ورودی ها را پر کنید', {type: toast.TYPE.ERROR})
        }else{
            setOrderCreateTitleAndMessageValid(true)
        }

        if(orderCreateMessage.length <= 5 && orderCreateTitle.length >= 4) {
            setOrderCreateMessageValid(false)
            setTimeout(() => {
                setOrderCreateMessageValid(true)
            }, 850)
            toast('لطفا ورودی را پر کنید', {type: toast.TYPE.ERROR})
        }else{
            setOrderCreateMessageValid(true)
        }

        if(orderCreateTitle.length < 4 && orderCreateMessage.length > 5) {
            setOrderCreateTitleValid(false)
            setTimeout(() => {
                setOrderCreateTitleValid(true)
            }, 850)
            toast('لطفا ورودی را پر کنید', {type: toast.TYPE.ERROR})
        }else{
            setOrderCreateTitleValid(true)
        }

        if(orderRulesCheck === false) {
            toast('خواندن و تایید قوانین الزامیست', {type: toast.TYPE.ERROR})
        }

        if(orderCreateMessage.length > 5 && orderCreateTitle.length >= 4 && orderRulesCheck === true) {

            if(orderRulesCheck === true) {
                setOrderCreateMessageValid(true)
                setOrderCreateTitleValid(true)
                setLoading(true)

                axios.post('http://185.211.59.237/Order/Create', {
                    categoryGuid: selectedCategory.categoryGuid,
                    title: orderCreateTitle,
                    description: orderCreateMessage
                }, {
                    headers: { Authorization: "Bearer " + cookies.token }
                }).then(res => {
                    console.log(res.data)
                    setLoading(false)
                    if(res.data.state === 1) {
                        props.hideOrderCreateModal()
                        props.sidebarForceRefresh()
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
                toast('خواندن و تایید قوانین الزامیست', {type: toast.TYPE.ERROR})
            }
        }
    }

    const orderCreateMsgChangeHandler = e => {
        setOrderCreateMessage(e.target.value)
    }

    const orderCreateTitleChangeHandler = e => {
        setOrderCreateTitle(e.target.value)
    }

    const rulesModalShowHandler = () => {
        setRulesModalShow(true)
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          textAlign: 'right',
          borderBottom: '1px dotted pink',
          color: state.isSelected ? '#ffd617' : '#0b1033',
          backgroundColor: state.isSelected ? '#0b1033' : 'none',
          padding: 10,
        }),
        placeholder: () => ({
            color: '#cccccc',
            fontSize: '0.8rem',
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
          const color = '#0b1033'
      
          return { ...provided, opacity, transition, color };
        }
      }

      const categoriesChanger = val => {
        setSelectedCategory(val)
      }


    return (
        <>
        <div className={!props.hidden ? classes.uiModalsBackdrop : classes.uiModalsBackdropHidden}
         onClick={props.hideOrderCreateModal}>
        </div>
            <div className={!props.hidden ? classes.orderCreateModalBackdrop : classes.orderCreateModalBackdropHide}>
            </div>

            <div className={!props.hidden ? classes.orderCreateModal : classes.orderCreateModalHidden}>
                <FontAwesomeIcon icon={faTimes}
                onClick={props.hideOrderCreateModal}
                className={classes.orderCreateModalCloseIcon} />
                <h4 className={classes.orderCreateModalLabel}>
                    ثبت سفارش در
                </h4>
                {categories.length > 0 ?
                <Select key={1}
                    inputId="orderCreateModalCategories11"
                    instanceId="orderCreateModalCategories12"
                    placeholder="دسته بندی"
                    className={classes.orderCreateModalCategories}
                    defaultValue={categories[0]}
                    label="Single select"
                    isRtl={true}
                    isLoading={categoriesLoading}
                    loadingMessage={() => "درحال بارگیری..."}
                    noOptionsMessage={() => "نتیجه ای یافت نشد"}
                    styles={customStyles}
                    options={categories}
                    getOptionLabel={option => `${option.title}`}
                    getOptionValue={option => `${option.categoryGuid}`}
                    onChange={val => categoriesChanger(val)}
                />
                :
                <Select key={2}
                    inputId="orderCreateModalCategories133"
                    instanceId="orderCreateModalCategories133"
                    placeholder="دسته بندی"
                    className={classes.orderCreateModalCategories}
                    label="Single selectttttt"
                    isRtl={true}
                    isLoading={categoriesLoading}
                    loadingMessage={() => "درحال بارگیری..."}
                    noOptionsMessage={() => "نتیجه ای یافت نشد"}
                    styles={customStyles}
                    options={categories}
                    getOptionLabel={option => `${option.title}`}
                    getOptionValue={option => `${option.categoryGuid}`}
                    onChange={val => categoriesChanger(val)}
                />
                }
                <input onChange={e => orderCreateTitleChangeHandler(e)}
                value={orderCreateTitle}
                placeholder="عنوان"
                className={orderCreateTitleValid && orderCreateTitleAndMessageValid ?
                    classes.orderCreateModalTitle :
                    classes.orderCreateModalTitleInvalid}
                />
                <textarea onChange={e => orderCreateMsgChangeHandler(e)}
                value={orderCreateMessage}
                placeholder="توضیحات"
                className={orderCreateMessageValid && orderCreateTitleAndMessageValid ? 
                    classes.orderCreateModalTextarea :
                    classes.orderCreateModalTextareaInvalid }>
                </textarea>

                <p className={classes.orderCreateRuleCheckKeeper}>
                    <input type="checkbox" id="orderRulesCheck"
                    checked={orderRulesCheck}
                    onChange={orderRulesCheckboxChange}
                    />
                    <label htmlFor="orderRulesCheck">
                        را خوانده و قبول دارم
                    </label>
                    <span className={classes.orderRulesCheckModalToggler}
                    onClick={props.rulesModalShowHandler}>قوانین</span>
                </p>

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
