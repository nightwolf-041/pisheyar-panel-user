import React, { Component } from 'react'
import { Formik } from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Select from 'react-select';
import axios from 'axios'
// import anime from 'animejs'
import classes from './login.module.css'


class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.registerAlertRef = React.createRef()
        this.registerStep2AlertRef = React.createRef()
        this.loginAlertRef = React.createRef()
        this.loginAlertDoneRef = React.createRef()

        this.state = {
            loginRegisterSwitch: false,

            minutes: 2,
            seconds: 0,

            minutes2: 2,
            seconds2: 0,

            loginPhoneNumberValue: '',
            loginPhoneNumberValid: true,

            loginStepTwoSwitch: false,

            loginStep2CodeValue: '',
            loginStep2CodeValid: true,

            registerNameValue: '',
            registerNameValid: true,
            registerFamlyValue: '',
            registerFamlyValid: true,
            registerEmailValue: '',
            registerEmailValid: true,
            registerPhoneNumberValue: '',
            registerPhoneNumberValid: true,

            registerStepTwoSwitch: false,

            registerStep2CodeValue: '',
            registerStep2CodeValid: true,

            registerStatus : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },

            registerStep2Status : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },

            loginStatus : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },

            loginStep2Status : {
                loading: null,
                success: null,
                error: null,
                errorMsg: null
            },

            countriesLoading: true,
            countries: [],

            citiesLoading: false,
            cities: [],

            countryValue: {value: 'تهران', label: 'تهران'},
            cityValue: {value: 'تهران', label: 'تهران'},
            genderValue: {value: '6e48b657-2c83-4481-a9c5-009ffe10158b', label: 'مرد'}

        }
    }

    componentDidMount() {
        // countries
        axios.get('http://185.94.97.164/api/Account/Provinces').then(res => {
            console.log(res.data.provinces);
            this.setState({
                countries: res.data.provinces,
                countriesLoading: false
            })
        }).catch(err => {
            this.setState({
                countries: [],
                countriesLoading: true
            })
        })
    }


    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    loginPhoneNumberChangeHandler = (e) => {
        let loginPhoneNumberValue = { ...this.state.loginPhoneNumberValue }
        loginPhoneNumberValue = e.target.value
        this.setState({ loginPhoneNumberValue: loginPhoneNumberValue })
    }

    loginStep2CodeChangeHandler = (e) => {
        let loginStep2CodeValue = { ...this.state.loginStep2CodeValue }
        loginStep2CodeValue = e.target.value
        this.setState({ loginStep2CodeValue: loginStep2CodeValue })
    }

    registerNameChangeHandler = (e) => {
        let registerNameValue = { ...this.state.registerNameValue }
        registerNameValue = e.target.value
        this.setState({ registerNameValue: registerNameValue })
    }

    registerFamilyChangeHandler = (e) => {
        let registerFamlyValue = { ...this.state.registerFamlyValue }
        registerFamlyValue = e.target.value
        this.setState({ registerFamlyValue: registerFamlyValue })
    }

    registerEmailChangeHandler = (e) => {
        let registerEmailValue = { ...this.state.registerEmailValue }
        registerEmailValue = e.target.value
        this.setState({ registerEmailValue: registerEmailValue })
    }

    registerPhoneNumberChangeHandler = (e) => {
        let registerPhoneNumberValue = { ...this.state.registerPhoneNumberValue }
        registerPhoneNumberValue = e.target.value
        this.setState({ registerPhoneNumberValue: registerPhoneNumberValue })
    }

    registerStep2CodeChangeHandler = (e) => {
        let registerStep2CodeValue = { ...this.state.registerStep2CodeValue }
        registerStep2CodeValue = e.target.value
        this.setState({ registerStep2CodeValue: registerStep2CodeValue })
    }

    reLoginAlertHandler = () => {
        this.props.history.goBack()
    }

    registerStep2BackHandler = () => {
        this.setState({registerStepTwoSwitch: false})
    }
    loginStep2BackHandler = () => {
        this.setState({loginStepTwoSwitch: false})
    }

    countryChanger = (val) => {
        this.setState({countryValue: val})
        if(val.value.length > 0){
            this.setState({citiesLoading: true})
            // cities 
            let guid = val.provinceGuid
            axios.get(`http://185.94.97.164/api/Account/Provinces/${guid}/Cities`).then(res => {
                console.log(res.data);
                this.setState({
                    cities: res.data.cities,
                    citiesLoading: false
                })
            }).catch(err => {
                this.setState({
                    cities: [],
                    citiesLoading: true
                })
            })
        }
    }
    cityChanger = (val) => {
        this.setState({cityValue: val})
    }
    genderChanger = (val) => {
        this.setState({genderValue: val})
    }

    // componentDidUpdate() {
    //     if(this.state.loginRegisterSwitch === false){
    //         this.setState({loginRegisterSwitch: false})
    //     }

    // }


    render() {

        const flavourOptions = [
            { value: 'تهران', label: 'تهران' },
            { value: 'میانه', label: 'میانه' },
            { value: 'مرند', label: 'مرند' },
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
            { value: 'آستارا', label: 'آستارا' } ,
        ]

        const genders = [
            {value: '2b451e4c-c9b8-415a-bcb4-05da15447b89', label: 'زن'},
            {value: '6e48b657-2c83-4481-a9c5-009ffe10158b', label: 'مرد'}
        ]
    
        const customStyles = {
            option: (provided, state) => ({
              ...provided,
            //   borderBottom: '1px dotted pink',
              color: state.isSelected ? '#ffd617' : '#0b1033',
              backgroundColor: state.isSelected ? '#0b1033' : 'none',
              padding: 10,
              textAlign: 'right'
            }),
            placeholder: () => ({
                color: 'rgba(11, 16, 51, 0.75)'
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
              const color = 'rgba(11, 16, 51, 0.75)'
          
              return { ...provided, opacity, transition, color };
            }
          }

      
        return (
            <>

            <div className={classes.loginKeeper}>
                <PerfectScrollbar>
                <div className={classes.loginPageMain}>
                    <div className={classes.loginRegisterSwitch}>

                        <div className={
                            this.state.loginRegisterSwitch === false ? classes.registerSideBox
                                : classes.registerSideBoxHidden
                        }>
                            <h5 className={classes.registerboxHead}>
                                قبلا ثبت نام نکرده اید ؟
                        </h5>
                            <p className={classes.registerboxDesc}>
                                همین حالا حساب کاربری خود را ایجاد کنید
                        </p>
                            <button className={classes.registerboxButton}
                                onClick={() => this.setState({ loginRegisterSwitch: true })}>
                                ثبت نام
                        </button>
                        </div>

                        <div className={
                            this.state.loginRegisterSwitch === true ? classes.loginSideBox
                                : classes.loginSideBoxHidden
                        }>
                            <h5 className={classes.loginboxHead}>
                                قبلا ثبت نام کرده اید ؟
                        </h5>
                            <p className={classes.loginboxDesc}>
                                مشخصات خود را پر کرده و وارد شوید
                        </p>
                            <button className={classes.loginboxButton}
                                onClick={() => this.setState({ loginRegisterSwitch: false })}>
                                ورود
                        </button>
                        </div>


                        <div className={
                            this.state.loginRegisterSwitch === false ? classes.loginRegisterLoginBox
                                : classes.loginRegisterRegisterBox
                        }>

                            {this.state.loginRegisterSwitch === false ?
                                <div>
                                    <h4 className={classes.loginRegisterLoginHead}>
                                        {this.state.loginStepTwoSwitch ?
                                        'کد دریافتی را وارد کنید'
                                        :
                                        'ورود'
                                        }
                                    </h4>

                                    {this.state.loginStepTwoSwitch ?
                                      <Formik
                                      initialValues={{ logPhoneNumber: '' }}
                                      validate={values => {
                                          let errors = {};
  
                                          if (!this.state.loginStep2CodeValue) {
                                              errors.logPhoneNumber = 'کد را وارد کنید';
                                              this.setState({ loginStep2CodeValid: false })
                                          }
                                           else if (
                                              !/^\d+$/.test(this.state.loginStep2CodeValue)) {
                                              errors.logPhoneNumber = 'کد باید عددی باشد';
                                              this.setState({ loginStep2CodeValid: false })
                                          }
                                           else if(this.state.loginStep2CodeValue.length !== 6) {
                                              errors.logPhoneNumber = 'کد باید ۶ رقمی باشد';
                                          } else {
                                              this.setState({ loginStep2CodeValid: true })
                                          }
  
                                          return errors;
                                      }}
  
                                      onSubmit={() => {
                                         
                                        let loginPhoneNumber = this.state.loginPhoneNumberValue
                                        let loginCode = this.state.loginStep2CodeValue
                                      
                                        //  this.props.onLoginAuth(loginPhoneNumber,loginCode,
                                        //      this.loginAlertDoneRef.current, this.props.history)
  
                                      }}>
  
                                      {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isSubmitting,
                                      }) => (
  
                                              <form className={classes.loginRegisterLoginForm}
                                                  onSubmit={handleSubmit}>
                                                  <input
                                                      className={!errors.logPhoneNumber ?
                                                          classes.registerStep2CodeInput
                                                          : classes.registerStep2CodeInputInvalid}
                                                      type="text"
                                                      name="loginCode"
                                                      onChange={this.loginStep2CodeChangeHandler}
                                                      // onBlur={handleBlur}
                                                      value={this.state.loginStep2CodeValue}
                                                      placeholder="کد دریافتی"
                                                  />
                                                  {errors.logPhoneNumber &&
                                                      touched.logPhoneNumber && (
                                                          <div className={classes.registerStep2CodeErrorSpan}>{errors.logPhoneNumber}</div>
                                                      )
                                                  }
  
                                                  <div className={classes.timerBox}>
                                                      <span>
                                                          {this.state.minutes2}:{this.state.seconds2 < 10 ? `0${this.state.seconds2}` : this.state.seconds2}
                                                      </span>
                                                  </div>
                                                 
                                                  <div className={classes.registerStep2Buttonsbox}>
                                                      <button type="submit"
                                                    //   disabled={this.props.loading}
                                                      className={classes.loginStep2Button}>
                                                      ورود
                                                      </button>
  
                                                      <button type="button"
                                                      onClick={this.loginStep2BackHandler}
                                                    //   disabled={this.props.loading}
                                                      className={classes.loginStep2BackButton}>
                                                          بازگشت
                                                      </button>
                                                  </div>
                                              </form>
                                          )}
                                      </Formik> 
                                     : 
                                     <>
                                     <Formik
                                     initialValues={{ logPhoneNumber: '' }}
                                     validate={values => {
                                         let errors = {};

                                         if (!this.state.loginPhoneNumberValue) {
                                             errors.logPhoneNumber = 'الزامیست';
                                             this.setState({ loginPhoneNumberValid: false })
                                         } else if (
                                             !/^\d+$/.test(this.state.loginPhoneNumberValue)) {
                                             errors.logPhoneNumber = 'شماره موبایل معتبر نیست';
                                             this.setState({ loginPhoneNumberValid: false })
                                         } else if(this.state.loginPhoneNumberValue.length !== 11) {
                                             errors.logPhoneNumber = 'شماره موبایل صحیح نیست';
                                         } else {
                                             this.setState({ loginPhoneNumberValid: true })
                                         }

                                         return errors;
                                     }}

                                     onSubmit={() => {
                                         
                                         const loginStatus = {...this.state.loginStatus}
                                         loginStatus.loading = true
                                         loginStatus.success = false
                                         loginStatus.error = false

                                         this.setState({
                                             loginStatus: loginStatus
                                         }) 

                                         axios.post('http://185.94.97.164/api/Account/Login', {
                                             mobile: this.state.loginPhoneNumberValue
                                         }).then(res => {

                                             if(res.data.state === 1) {
                                                 const loginStatus = {...this.state.loginStatus}
                                                 loginStatus.loading = false
                                                 loginStatus.success = true
                                                 loginStatus.error = false

                                                 this.setState({
                                                     loginStatus: loginStatus,
                                                     loginStepTwoSwitch: true
                                                 })

                                                //  let SuccessAlert = this.loginAlertRef.current
                                                //  anime({
                                                //      targets: SuccessAlert,
                                                //      height: '70px',
                                                //      paddingTop: '17px',
                                                //      top: '0',
                                                //      display: 'fixed',
                                                //      backgroundColor: '#43A047'
                                                //  })
                                                //  setTimeout(() => {
                                                //      anime({
                                                //          targets: SuccessAlert,
                                                //          height: '0',
                                                //          top: '-40%',
                                                //          display: 'none'
                                                //      })
                                                //  }, 3000);

                                                 this.setState({
                                                     minutes2: 2,
                                                     seconds2: 0
                                                 })
                                         
                                                 clearInterval(this.myTimer2)
                                         
                                                 this.myTimer2 = setInterval(() => {
                                                     let { minutes2, seconds2 } = this.state
                                         
                                                     if (seconds2 > 0) {
                                                         this.setState(({ seconds2 }) => ({
                                                             seconds2: seconds2 - 1
                                                         }))
                                                     }
                                                     if (seconds2 === 0) {
                                                         if (minutes2 === 0) {
                                                             clearInterval(this.myTimer2)
                                                             this.setState({
                                                                 loginStepTwoSwitch: false
                                                             })
                                                         } else {
                                                             this.setState(({ minutes2 }) => ({
                                                                 minutes2: minutes2 - 1,
                                                                 seconds2: 59
                                                             }))
                                                         }
                                                     } 
                                         
                                                 }, 1000)
                                             }

                                             if(res.data.state === 2 || res.data.state === 3) {
                                                 const loginStatus = {...this.state.loginStatus}
                                                 loginStatus.loading = false
                                                 loginStatus.success = false
                                                 loginStatus.error = true
                                                 loginStatus.errorMsg = res.data.message

                                                 this.setState({
                                                     loginStatus: loginStatus,
                                                     // registerStepTwoSwitch: true
                                                 })

                                                //  let SuccessAlert = this.loginAlertRef.current
                                                //  anime({
                                                //      targets: SuccessAlert,
                                                //      height: '70px',
                                                //      paddingTop: '17px',
                                                //      top: '0',
                                                //      display: 'fixed',
                                                //      backgroundColor: '#f44336'
                                                //  })
                                                //  setTimeout(() => {
                                                //      anime({
                                                //          targets: SuccessAlert,
                                                //          height: '0',
                                                //          top: '-40%',
                                                //          display: 'none'
                                                //      })
                                                //  }, 3000);
                                             }
                                         }).catch(err => {
                                             const loginStatus = {...this.state.loginStatus}
                                             loginStatus.loading = false
                                             loginStatus.success = false
                                             loginStatus.error = true
                                             loginStatus.errorMsg = err.message
                                             this.setState({loginStatus: loginStatus})

                                            //  let ErrorAlert = this.loginAlertRef.current
                                            //  anime({
                                            //      targets: ErrorAlert,
                                            //      height: '70px',
                                            //      paddingTop: '17px',
                                            //      top: '0',
                                            //      display: 'fixed',
                                            //      backgroundColor: '#f44336'
                                            //  })
                                            //  setTimeout(() => {
                                            //      anime({
                                            //          targets: ErrorAlert,
                                            //          height: '0',
                                            //          top: '-40%',
                                            //          display: 'none',
                                            //      })
                                            //  }, 4000);
                                         })

                                     }}>

                                     {({
                                         values,
                                         errors,
                                         touched,
                                         handleChange,
                                         handleBlur,
                                         handleSubmit,
                                         isSubmitting,
                                     }) => (

                                             <form className={classes.loginRegisterLoginForm}
                                                 onSubmit={handleSubmit}>
                                                 <input
                                                     className={!errors.logPhoneNumber ?
                                                         classes.loginRegisterLoginPhoneNumber
                                                         : classes.loginRegisterLoginPhoneNumberInvalid}
                                                     type="text"
                                                     name="mobile"
                                                     onChange={this.loginPhoneNumberChangeHandler}
                                                     // onBlur={handleBlur}
                                                     value={this.state.loginPhoneNumberValue}
                                                     placeholder="شماره موبایل"
                                                 />
                                                 {errors.logPhoneNumber &&
                                                     touched.logPhoneNumber && (
                                                         <div className={classes.loginMobileErrorSpan}>{errors.logPhoneNumber}</div>
                                                     )
                                                 }
                                                {/* this.state.registerStatus.loading */}
                                                 <button type="submit"
                                                     disabled={this.state.loginStatus.loading}
                                                     className={classes.loginRegisterLoginButton}>
                                                     {this.state.loginStatus.loading ?
                                                     'صبور باشید' :
                                                     'ورود ادمین'}
                                                </button>
                                                 <button type="submit"
                                                     disabled={this.state.loginStatus.loading}
                                                     className={classes.loginRegisterLoginButtonByer}>
                                                     {this.state.loginStatus.loading ?
                                                     'صبور باشید' :
                                                     'ورود مشتری'}
                                                </button>
                                             </form>
                                         )}
                                 </Formik>
                                 <div className={classes.loginBottomShadowBox}></div>
                                 </>
                                     }
                                   

                                </div>
                                :

                                <div>
                                    {/* start */}
                                    <h4 className={classes.loginRegisterRegisterHead}>
                                        {this.state.registerStepTwoSwitch ?
                                        'کد دریافتی را وارد کنید' :
                                        'ثبت نام'
                                        }
                                    </h4>

                                  

                                    {this.state.registerStepTwoSwitch ?
                                    <Formik
                                    initialValues={{ logPhoneNumber: '' }}
                                    validate={values => {
                                        let errors = {};

                                        if (!this.state.registerStep2CodeValue) {
                                            errors.logPhoneNumber = 'کد را وارد کنید';
                                            this.setState({ registerStep2CodeValid: false })
                                        }
                                         else if (
                                            !/^\d+$/.test(this.state.registerStep2CodeValue)) {
                                            errors.logPhoneNumber = 'کد باید عددی باشد';
                                            this.setState({ registerStep2CodeValid: false })
                                        }
                                         else if(this.state.registerStep2CodeValue.length !== 6) {
                                            errors.logPhoneNumber = 'کد باید ۶ رقمی باشد';
                                        } else {
                                            this.setState({ registerStep2CodeValid: true })
                                        }

                                        return errors;
                                    }}

                                    onSubmit={() => {

                                        const registerStep2Status = {...this.state.registerStep2Status}
                                        registerStep2Status.loading = true
                                        registerStep2Status.success = false
                                        registerStep2Status.error = false
                                        this.setState({
                                            registerStep2Status: registerStep2Status
                                        })

                                        axios.post('http://185.94.97.164/api/Account/Authenticate', {
                                            mobile: this.state.registerPhoneNumberValue,
                                            code: this.state.registerStep2CodeValue,
                                            rememberMe: true 
                                        }).then(res => {

                                        // console.log(res.data.token);
                                        // console.log(res);

                                            if(res.data.token !== null) {
                                                const registerStep2Status = {...this.state.registerStep2Status}
                                                registerStep2Status.loading = false
                                                registerStep2Status.success = true
                                                registerStep2Status.error = false

                                                this.setState({
                                                    registerStep2Status: registerStep2Status,
                                                    registerStepTwoSwitch: false,
                                                    loginRegisterSwitch: false
                                                })
                                                let SuccessAlert = this.registerStep2AlertRef.current
                                                // anime({
                                                //     targets: SuccessAlert,
                                                //     height: '70px',
                                                //     paddingTop: '17px',
                                                //     top: '0',
                                                //     display: 'fixed',
                                                //     backgroundColor: '#43A047'
                                                // })
                                                // setTimeout(() => {
                                                //     anime({
                                                //         targets: SuccessAlert,
                                                //         height: '0',
                                                //         top: '-40%',
                                                //         display: 'none'
                                                //     })
                                                // }, 3000);
                                            }else {
                                                const registerStep2Status = {...this.state.registerStep2Status}
                                                registerStep2Status.loading = false
                                                registerStep2Status.success = false
                                                registerStep2Status.error = true
                                                registerStep2Status.errorMsg = res.data.message

                                                this.setState({
                                                    registerStep2Status: registerStep2Status,
                                                    // registerStepTwoSwitch: false,
                                                    // loginRegisterSwitch: false
                                                })
                                                // let SuccessAlert = this.registerStep2AlertRef.current
                                                // anime({
                                                //     targets: SuccessAlert,
                                                //     height: '70px',
                                                //     paddingTop: '17px',
                                                //     top: '0',
                                                //     display: 'fixed',
                                                //     backgroundColor: '#f44336'
                                                // })
                                                // setTimeout(() => {
                                                //     anime({
                                                //         targets: SuccessAlert,
                                                //         height: '0',
                                                //         top: '-40%',
                                                //         display: 'none'
                                                //     })
                                                // }, 3000);
                                            }

                                        }).catch(err => {
                                            const registerStep2Status = {...this.state.registerStep2Status}
                                            registerStep2Status.loading = false
                                            registerStep2Status.success = false
                                            registerStep2Status.error = true
                                            registerStep2Status.errorMsg = err.message
                                            this.setState({registerStep2Status: registerStep2Status})

                                            // let ErrorAlert = this.registerStep2AlertRef.current
                                            // anime({
                                            //     targets: ErrorAlert,
                                            //     height: '70px',
                                            //     paddingTop: '17px',
                                            //     top: '0',
                                            //     display: 'fixed',
                                            //     backgroundColor: '#f44336'
                                            // })
                                            // setTimeout(() => {
                                            //     anime({
                                            //         targets: ErrorAlert,
                                            //         height: '0',
                                            //         top: '-40%',
                                            //         display: 'none',
                                            //     })
                                            // }, 4000);
                                        })

                                    }}>

                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (

                                            <form className={classes.loginRegisterLoginForm}
                                                onSubmit={handleSubmit}>
                                                <input
                                                    className={!errors.logPhoneNumber ?
                                                        classes.registerStep2CodeInput
                                                        : classes.registerStep2CodeInputInvalid}
                                                    type="text"
                                                    name="code"
                                                    onChange={this.registerStep2CodeChangeHandler}
                                                    // onBlur={handleBlur}
                                                    value={this.state.registerStep2CodeValue}
                                                    placeholder="کد دریافتی"
                                                />
                                                {errors.logPhoneNumber &&
                                                    touched.logPhoneNumber && (
                                                        <div className={classes.registerStep2CodeErrorSpan}>{errors.logPhoneNumber}</div>
                                                    )
                                                }

                                                <div className={classes.timerBox}>
                                                    <span>
                                                        {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
                                                    </span>
                                                </div>
                                               
                                                <div className={classes.registerStep2Buttonsbox}>
                                                    <button type="submit"
                                                    disabled={this.state.registerStep2Status.loading}
                                                    className={classes.registerStep2Button}>
                                                    {this.state.registerStep2Status.loading ?
                                                    'صبور باشید' :
                                                    'ثبت نهایی'}
                                                    </button>

                                                    <button type="button"
                                                    onClick={this.registerStep2BackHandler}
                                                    disabled={this.state.registerStep2Status.loading}
                                                    className={classes.registerStep2BackButton}>
                                                        بازگشت
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                    
                                    :
                                    <>
                                    <Formik
                                        initialValues={{
                                            name: '', family: '', email: '', phoneNumber: ''
                                        }}

                                        validate={values => {
                                            let errors = {};

                                            if (!this.state.registerNameValue) {
                                                errors.name = 'الزامیست';
                                                this.setState({ registerNameValid: false })
                                            } else if (this.state.registerNameValue.length < 3) {
                                                errors.name = 'کوتاه است';
                                                this.setState({ registerNameValid: false })
                                            } else {
                                                this.setState({ registerNameValid: true })
                                            }

                                            if (!this.state.registerFamlyValue) {
                                                errors.family = 'الزامیست';
                                                this.setState({ registerFamlyValid: false })
                                            } else if (this.state.registerFamlyValue.length < 3) {
                                                errors.family = 'کوتاه است';
                                                this.setState({ registerFamlyValid: false })
                                            } else {
                                                this.setState({ registerFamlyValid: true })
                                            }

                                            // if (!this.state.registerEmailValue) {
                                            //     errors.email = 'الزامیست';
                                            //     this.setState({ registerEmailValid: false })
                                            // } else if (
                                            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.registerEmailValue)) {
                                            //     errors.email = 'ایمیل نامعتبر است';
                                            //     this.setState({ registerEmailValid: false })
                                            // } else {
                                            //     this.setState({ registerEmailValid: true })
                                            // }

                                            if (!this.state.registerPhoneNumberValue) {
                                                errors.phoneNumber = 'الزامیست';
                                                this.setState({ registerPhoneNumberValid: false })
                                            } else if (
                                                !/^\d+$/.test(this.state.registerPhoneNumberValue)) {
                                                errors.phoneNumber = 'شماره موبایل معتبر نیست';
                                                this.setState({ registerPhoneNumberValid: false })
                                            } else if(this.state.registerPhoneNumberValue.length !== 11) {
                                                errors.phoneNumber = 'شماره موبایل صحیح نیست';
                                            } else {
                                                this.setState({ registerPhoneNumberValid: true })
                                            }

                                            // console.log(errors);
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            let regName = this.state.registerNameValue
                                            let regFamily = this.state.registerFamlyValue
                                            let regEmail = this.state.registerEmailValue
                                            let regPhonenumber = this.state.registerPhoneNumberValue

                                            const registerData = {
                                                name: regName,
                                                family: regFamily,
                                                email: regEmail,
                                                mobile: regPhonenumber
                                            }

                                            // console.log(registerData);

                                            const registerStatus = {...this.state.registerStatus}
                                            registerStatus.loading = true
                                            registerStatus.success = false
                                            registerStatus.error = false
                                            this.setState({registerStatus: registerStatus})

                                            axios.post('http://185.94.97.164/api/Account/Register', registerData).then(res => {

                                                console.log(res.data.state);

                                                if(res.data.state === 1) {
                                                    const registerStatus = {...this.state.registerStatus}
                                                    registerStatus.loading = false
                                                    registerStatus.success = true
                                                    registerStatus.error = false

                                                    this.setState({
                                                        registerStatus: registerStatus,
                                                        registerStepTwoSwitch: true
                                                    })

                                                    // let SuccessAlert = this.registerAlertRef.current
                                                    // anime({
                                                    //     targets: SuccessAlert,
                                                    //     height: '70px',
                                                    //     paddingTop: '17px',
                                                    //     top: '0',
                                                    //     display: 'fixed',
                                                    //     backgroundColor: '#43A047'
                                                    // })
                                                    // setTimeout(() => {
                                                    //     anime({
                                                    //         targets: SuccessAlert,
                                                    //         height: '0',
                                                    //         top: '-40%',
                                                    //         display: 'none'
                                                    //     })
                                                    // }, 3000);

                                                    this.setState({
                                                        minutes: 2,
                                                        seconds: 0
                                                    })
                                                    
                                                    clearInterval(this.myTimer)
                                                    
                                                    this.myTimer = setInterval(() => {
                                                        let { minutes, seconds } = this.state
                                            
                                                        if (seconds > 0) {
                                                            this.setState(({ seconds }) => ({
                                                                seconds: seconds - 1
                                                            }))
                                                        }
                                                        if (seconds === 0) {
                                                            if (minutes === 0) {
                                                                clearInterval(this.myTimer)
                                                                this.setState({registerStepTwoSwitch: false})
                                                            } else {
                                                                this.setState(({ minutes }) => ({
                                                                    minutes: minutes - 1,
                                                                    seconds: 59
                                                                }))
                                                            }
                                                        } 
                                            
                                                    }, 1000)
                                                }

                                                if(res.data.state === 2 || res.data.state === 3) {
                                                    const registerStatus = {...this.state.registerStatus}
                                                    registerStatus.loading = false
                                                    registerStatus.success = false
                                                    registerStatus.error = true
                                                    registerStatus.errorMsg = res.data.message

                                                    this.setState({
                                                        registerStatus: registerStatus,
                                                        // registerStepTwoSwitch: true
                                                    })

                                                    // let SuccessAlert = this.registerAlertRef.current
                                                    // anime({
                                                    //     targets: SuccessAlert,
                                                    //     height: '70px',
                                                    //     paddingTop: '17px',
                                                    //     top: '0',
                                                    //     display: 'fixed',
                                                    //     backgroundColor: '#f44336'
                                                    // })
                                                    // setTimeout(() => {
                                                    //     anime({
                                                    //         targets: SuccessAlert,
                                                    //         height: '0',
                                                    //         top: '-40%',
                                                    //         display: 'none'
                                                    //     })
                                                    // }, 3000);
                                                }

                                            }).catch(err => {
                                                const registerStatus = {...this.state.registerStatus}
                                                registerStatus.loading = false
                                                registerStatus.success = false
                                                registerStatus.error = true
                                                registerStatus.errorMsg = err.message
                                                this.setState({registerStatus: registerStatus})

                                                // let ErrorAlert = this.registerAlertRef.current
                                                // anime({
                                                //     targets: ErrorAlert,
                                                //     height: '70px',
                                                //     paddingTop: '17px',
                                                //     top: '0',
                                                //     display: 'fixed',
                                                //     backgroundColor: '#f44336'
                                                // })
                                                // setTimeout(() => {
                                                //     anime({
                                                //         targets: ErrorAlert,
                                                //         height: '0',
                                                //         top: '-40%',
                                                //         display: 'none',
                                                //     })
                                                // }, 4000);
                                            })
                                        }}>

                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                        }) =>
                                            (
                                                <form className={classes.loginRegisterRegisterForm}
                                                    onSubmit={handleSubmit}>

                                                    <input
                                                        className={!errors.name ?
                                                            classes.loginRegisterRegisterName :
                                                            classes.loginRegisterRegisterNameInvalid}
                                                        type="text"
                                                        name="name"
                                                        onChange={this.registerNameChangeHandler}
                                                        onBlur={handleBlur}
                                                        value={this.state.registerNameValue}
                                                        placeholder="نام"
                                                    />
                                                    {errors.name && (
                                                        <div className={classes.registerNameErrorSpan}>{errors.name}</div>
                                                    )}

                                                    <input
                                                        className={!errors.family ?
                                                            classes.loginRegisterRegisterFamily :
                                                            classes.loginRegisterRegisterFamilyInvalid}
                                                        type="text"
                                                        name="name"
                                                        onChange={this.registerFamilyChangeHandler}
                                                        onBlur={handleBlur}
                                                        value={this.state.registerFamlyValue}
                                                        placeholder="نام خانوادگی"
                                                    />
                                                    {errors.family && (
                                                        <div className={classes.registerFamilyErrorSpan}>{errors.family}</div>
                                                    )}

                                                    {/* <input
                                                        className={!errors.email ?
                                                            classes.loginRegisterRegisterEmail :
                                                            classes.loginRegisterRegisterEmailInvalid}
                                                        type="email"
                                                        name="email"
                                                        onChange={this.registerEmailChangeHandler}
                                                        // onBlur={handleBlur}
                                                        value={this.state.registerEmailValue}
                                                        placeholder="ایمیل"
                                                    />
                                                    {errors.email && (
                                                        <div className={classes.registerEmailErrorSpan}>{errors.email}</div>
                                                    )} */}
                                                    {/* <div class="form-group">
                                                        <label for="exampleFormControlSelect1">Example select</label> */}
                                                        <div className={classes.loginRegisterRegisterSelectsbox}>
                                                        <Select
                                                        inputId="loginRegisterRegisterSelectContry"
                                                        instanceId="loginRegisterRegisterSelectContry"
                                                        placeholder="استان"
                                                        className={classes.loginRegisterRegisterSelectContry}
                                                        defaultValue={this.state.countryValue}
                                                        label="Single select"
                                                        // loadingMessage="درال بارگیری"
                                                        isRtl={true}
                                                        isLoading={this.state.countriesLoading}
                                                        loadingMessage={() => "درحال بارگیری..."}
                                                        noOptionsMessage={() => "نتیجه ای یافت نشد"}
                                                        styles={customStyles}
                                                        options={this.state.countries}
                                                        onChange={val => this.countryChanger(val)}
                                                    />
                                                       <Select
                                                        inputId="loginRegisterRegisterSelectCity"
                                                        instanceId="loginRegisterRegisterSelectCity"
                                                        placeholder="شهر"
                                                        className={classes.loginRegisterRegisterSelectCity}
                                                        defaultValue={this.state.cityValue}
                                                        label="Single select"
                                                        isRtl={true}
                                                        isLoading={this.state.citiesLoading}
                                                        loadingMessage={() => "درحال بارگیری..."}
                                                        noOptionsMessage={() => "نتیجه ای یافت نشد"}
                                                        styles={customStyles}
                                                        options={this.state.cities}
                                                        onChange={val => this.cityChanger(val)}
                                                    />
                                                    </div>

                                                    <Select
                                                        inputId="loginRegisterRegisterSelectGender"
                                                        instanceId="loginRegisterRegisterSelectGender"
                                                        placeholder="جنسیت"
                                                        className={classes.loginRegisterRegisterSelectGender}
                                                        defaultValue={this.state.genderValue}
                                                        label="Single select"
                                                        // loadingMessage="درال بارگیری"
                                                        isRtl={true}
                                                        isLoading={this.state.countriesLoading}
                                                        loadingMessage={() => "درحال بارگیری..."}
                                                        noOptionsMessage={() => "نتیجه ای یافت نشد"}
                                                        styles={customStyles}
                                                        options={genders}
                                                        onChange={val => this.genderChanger(val)}
                                                    />

                                                    <input
                                                        className={!errors.phoneNumber ?
                                                            classes.loginRegisterRegisterPhoneNumber :
                                                            classes.loginRegisterRegisterPhoneNumberInvalid}
                                                        type="text"
                                                        name="password"
                                                        onChange={this.registerPhoneNumberChangeHandler}
                                                        onBlur={handleBlur}
                                                        value={this.state.registerPhoneNumberValue}
                                                        placeholder="شماره موبایل"
                                                    />

                                                    {errors.phoneNumber && (
                                                        <div className={classes.registerPhoneNumberErrorSpan}>{errors.phoneNumber}</div>
                                                    )}
{/* <div></div> */}
                                                    <button type="submit"
                                                    // onClick={this.registerHandler}
                                                    disabled={this.state.registerStatus.loading}
                                                        className={classes.loginRegisterRegisterButton}>
                                                        {this.state.registerStatus.loading ?
                                                        'صبور باشید':
                                                        'ثبت نام'}
                                                    </button>
                                                </form>
                                            )}
                                    </Formik>
                                    {/* <div className={classes.registerBottomShadowBox}></div> */}
                                    </>
                                }
                                      {/* start */}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* <div className={classes.loginPageBottom}></div> */}

                <div ref={this.loginAlertRef} className={classes.loginAlerts}>
                    {
                        this.state.loginStatus.error ?
                        <span>{this.state.loginStatus.errorMsg}</span>
                        : 
                        <h4>کد دریافتی را وارد کنید</h4>
                    }
                </div>

                <div ref={this.loginAlertDoneRef} className={classes.loginAlerts}>
                    {
                        // this.props.error ?
                        // <span>{this.props.errorMsg}</span>
                        // : 
                        <h4>خوش آمدید</h4>
                    }
                </div>

                <div ref={this.registerAlertRef} className={classes.registerAlerts}>
                    {this.state.registerStatus.error ?
                    <span>{this.state.registerStatus.errorMsg}</span>
                    :
                    <h4>کد دریافتی را وارد نمایید</h4>
                    }
                </div>

                <div ref={this.registerStep2AlertRef} className={classes.registerAlerts}>
                    {this.state.registerStep2Status.error ?
                    <span>{this.state.registerStep2Status.errorMsg}</span>
                    :
                    <h4>ثبت نام موفقیت آمیز بود</h4>
                    }
                </div>
                </PerfectScrollbar>
                </div>

            </>
        );
    }
}


export default LoginPage