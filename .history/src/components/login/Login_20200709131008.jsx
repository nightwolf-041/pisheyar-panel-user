import React, { Component } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { withCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import LoginBixSteps from './LoginBixSteps';
import RegisterBoxSteps from './RegisterBoxSteps';
import ContractorLoginModal from '../UI/ContractorLoginModal';
import 'react-toastify/dist/ReactToastify.css';
import classes from './login.module.css'
import { faBoxTissue } from '@fortawesome/free-solid-svg-icons';



class LoginPage extends Component {

    constructor(props) {
        super(props)
        const { cookies } = props;

        this.state = {
            token: cookies.get('token'),

            loginRegisterSwitch: false,

            minutes: 2,
            seconds: 0,

            minutes2: 2,
            seconds2: 0,

            contractorLoginModalHidden: true,

            registerBoxMinHeight: false,

            loginPhoneNumberValue: '',
            loginPhoneNumberValid: true,
            loginPhoneNumberValidMsg: '',

            loginStepTwoSwitch: false,

            loginStep2CodeValue: '',
            loginStep2CodeValid: true,
            loginStep2CodeValidMsg: '',

            checked: true,

            registerNameValue: '',
            registerNameValid: true,
            registerNameValidMsg: '',
            registerFamlyValue: '',
            registerFamlyValid: true,
            registerFamlyValidMsg: '',
            registerPhoneNumberValue: '',
            registerPhoneNumberValid: true,
            registerPhoneNumberValidMsg: '',

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

            countryValue: null,
            cityValue: null,
            cityValidMsg: null,
            genderValue: {value: '6e48b657-2c83-4481-a9c5-009ffe10158b', label: 'مرد'},

            toggleSubmitByer: false,
            authenticateRoleGuid: ''

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

        // cities 
        // this.setState({citiesLoading: true})
        // let guid = "4060c766-3795-4b08-8f25-e99261d2cb73"
        // axios.get(`http://185.94.97.164/api/Account/Provinces/${guid}/Cities`).then(res => {
        //     console.log(res.data)
        //     this.setState({
        //         cities: res.data.cities,
        //         citiesLoading: false
        //     })
        // }).catch(err => {
        //     this.setState({
        //         cities: [],
        //         citiesLoading: true
        //     })
        // })
    }


    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    loginPhoneNumberChangeHandler = (e) => {
        let loginPhoneNumberValue = { ...this.state.loginPhoneNumberValue }
        loginPhoneNumberValue = e.target.value
        this.setState({ loginPhoneNumberValue: loginPhoneNumberValue })
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

    registerPhoneNumberChangeHandler = (e) => {
        let registerPhoneNumberValue = { ...this.state.registerPhoneNumberValue }
        registerPhoneNumberValue = e.target.value
        this.setState({ registerPhoneNumberValue: registerPhoneNumberValue })
    }


    registerStep1ClickHandler = () => {

        if (!this.state.registerNameValue) {
            this.setState({ registerNameValid: false, registerNameValidMsg: 'الزامیست' })
        } else if (this.state.registerNameValue.length < 3) {
            this.setState({ registerNameValid: false, registerNameValidMsg: 'کوتاه است' })
        } else {
            this.setState({ registerNameValid: true, registerNameValidMsg: '' })
        }

        if (!this.state.registerFamlyValue) {
            this.setState({ registerFamlyValid: false, registerFamlyValidMsg: 'الزامیست' })
        } else if (this.state.registerFamlyValue.length < 3) {
            this.setState({ registerFamlyValid: false, registerFamlyValidMsg: 'کوتاه است' })
        } else {
            this.setState({ registerFamlyValid: true, registerFamlyValidMsg: '' })
        }

        if (!this.state.registerPhoneNumberValue) {
            this.setState({ registerPhoneNumberValid: false, registerPhoneNumberValidMsg: 'الزامیست' })
        } else if (
            !/^\d+$/.test(this.state.registerPhoneNumberValue)) {
            this.setState({ registerPhoneNumberValid: false, registerPhoneNumberValidMsg: 'شماره موبایل معتبر نیست' })
        } else if(this.state.registerPhoneNumberValue.length !== 11) {
            this.setState({ registerPhoneNumberValid: false , registerPhoneNumberValidMsg: 'شماره موبایل صحیح نیست' })
        } else {
            this.setState({ registerPhoneNumberValid: true , registerPhoneNumberValidMsg: '' })
        }

        if(this.state.cityValue === null) {
            this.setState({cityValidMsg: 'الزامیست'})
        }else{
            this.setState({cityValidMsg: ''})
        }

        if(this.state.registerNameValue.length > 3 && this.state.registerFamlyValue.length > 3 && this.state.cityValue !== null && this.state.registerPhoneNumberValue.length === 11 &&  /^\d+$/.test(this.state.registerPhoneNumberValue) ) {
            let regName = this.state.registerNameValue
            let regFamily = this.state.registerFamlyValue
            let regPhonenumber = this.state.registerPhoneNumberValue
            let regCity = this.state.cityValue.cityGuid
            let regGender = this.state.genderValue.value

            const registerData = {
                firstName: regName,
                lastName: regFamily,
                email: '',
                phoneNumber: regPhonenumber,
                cityGuid: regCity,
                genderGuid: regGender
            }

            const registerStatus = {...this.state.registerStatus}
            registerStatus.loading = true
            registerStatus.success = false
            registerStatus.error = false
            this.setState({registerStatus: registerStatus})

            axios.post('http://185.94.97.164//api/Account/RegisterClient', registerData).then(res => {

                console.log(res.data.state);

                if(res.data.state === 1) {
                    const registerStatus = {...this.state.registerStatus}
                    registerStatus.loading = false
                    registerStatus.success = true
                    registerStatus.error = false

                    this.setState({
                        registerStatus: registerStatus,
                        registerStepTwoSwitch: true,
                        registerBoxMinHeight: true,
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
                                this.setState({
                                    registerStepTwoSwitch: false,
                                    registerBoxMinHeight: false
                                })
                            } else {
                                this.setState(({ minutes }) => ({
                                    minutes: minutes - 1,
                                    seconds: 59
                                }))
                            }
                        } 
            
                    }, 1000)
                }

                if(res.data.state === 2) {
                    const registerStatus = {...this.state.registerStatus}
                    registerStatus.loading = false
                    registerStatus.success = false
                    registerStatus.error = true
                    registerStatus.errorMsg = res.data.message

                    this.setState({
                        registerStatus: registerStatus,
                        // registerStepTwoSwitch: true
                    })

                    toast('کاربر مورد نظر در سامانه ثبت شده است', {type: toast.TYPE.ERROR})

                }
                if(res.data.state === 3) {
                    const registerStatus = {...this.state.registerStatus}
                    registerStatus.loading = false
                    registerStatus.success = false
                    registerStatus.error = true
                    registerStatus.errorMsg = res.data.message

                    this.setState({
                        registerStatus: registerStatus,
                        // registerStepTwoSwitch: true
                    })

                    toast('جنسیت نامعتبر است', {type: toast.TYPE.ERROR})

                }
                if(res.data.state === 4) {
                    const registerStatus = {...this.state.registerStatus}
                    registerStatus.loading = false
                    registerStatus.success = false
                    registerStatus.error = true
                    registerStatus.errorMsg = res.data.message

                    this.setState({
                        registerStatus: registerStatus,
                        // registerStepTwoSwitch: true
                    })

                    toast('اطلاعات مکانی نامعتبر است', {type: toast.TYPE.ERROR})

                }

            }).catch(err => {
                const registerStatus = {...this.state.registerStatus}
                registerStatus.loading = false
                registerStatus.success = false
                registerStatus.error = true
                registerStatus.errorMsg = err.message
                this.setState({registerStatus: registerStatus})

            })
        }
    }

    registerReactCodeInputCganger = (val) => {
        this.setState({
            registerStep2CodeValue: val
        })
    }

    registerStep2ClickHandler = () => {
        const registerStep2Status = {...this.state.registerStep2Status}
        registerStep2Status.loading = true
        registerStep2Status.success = false
        registerStep2Status.error = false
        this.setState({
            registerStep2Status: registerStep2Status
        })

        axios.post('http://185.94.97.164/api/Account/Authenticate', {
            phoneNumber: this.state.registerPhoneNumberValue,
            smsToken: this.state.registerStep2CodeValue,
            rememberMe: true,
            roleGuid: '91b3cdab-39c1-40fb-b077-a2d6e611f50a'
        }).then(res => {

            if(res.data.token !== null) {
                const registerStep2Status = {...this.state.registerStep2Status}
                registerStep2Status.loading = false
                registerStep2Status.success = true
                registerStep2Status.error = false

                this.setState({
                    registerStep2Status: registerStep2Status,
                    registerStepTwoSwitch: false,
                    loginRegisterSwitch: false,
                    registerBoxMinHeight: false,
                    token: res.data.token
                })
                toast('ثبت نام موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})

                const { cookies } = this.props;
                cookies.set('token', res.data.token, {path: '/'});
                cookies.set('contractorOrClient', 'client', {path: '/'});

                this.props.history.replace('/')

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
                toast('کد وارد شده صحیح نمی باشد', {type: toast.TYPE.ERROR})
            }

        }).catch(err => {
            const registerStep2Status = {...this.state.registerStep2Status}
            registerStep2Status.loading = false
            registerStep2Status.success = false
            registerStep2Status.error = true
            registerStep2Status.errorMsg = err.message
            this.setState({registerStep2Status: registerStep2Status})

            toast('خطای شبکه', {type: toast.TYPE.ERROR})
        })
    }

    registerStep2BackHandler = () => {
        this.setState({registerStepTwoSwitch: false, registerBoxMinHeight: false})
    }

    loginStep2BackHandler = () => {
        this.setState({loginStepTwoSwitch: false})
    }
    
    handleByerSubmit= () => {
        this.setState({toggleSubmitByer: true})
    }


    countryChanger = (val) => {
        this.setState({countryValue: val})
        if(val.value.length > 0){
            this.setState({
                citiesLoading: true
            })
            // cities 
            let guid = val.provinceGuid
            axios.get(`http://185.94.97.164/api/Account/Provinces/${guid}/Cities`).then(res => {
                console.log(res.data);
                this.setState({
                    cities: res.data.cities,
                    citiesLoading: false,
                    cityValue: '',
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

    handleSellerByerSubmit = (val) => {

        if (!this.state.loginPhoneNumberValue) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'الزامیست' })
        } else if (
            !/^\d+$/.test(this.state.loginPhoneNumberValue)) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'شماره موبایل معتبر نیست' })
        } else if(this.state.loginPhoneNumberValue.length !== 11) {
            this.setState({ loginPhoneNumberValid: false, loginPhoneNumberValidMsg: 'شماره موبایل صحیح نیست' })
        } else {
            this.setState({ loginPhoneNumberValid: true, loginPhoneNumberValidMsg: '' })
        
        const loginStatus = {...this.state.loginStatus}
        loginStatus.loading = true
        loginStatus.success = false
        loginStatus.error = false

        this.setState({
            loginStatus: loginStatus
        }) 

        axios.post('http://185.94.97.164/api/Account/Login', {
            phoneNumber: this.state.loginPhoneNumberValue,
            roleGuid: val
        }).then(res => {

            console.log(res)

            if(res.data.state === 1) {
                const loginStatus = {...this.state.loginStatus}
                loginStatus.loading = false
                loginStatus.success = true
                loginStatus.error = false

                this.setState({
                    loginStatus: loginStatus,
                    loginStepTwoSwitch: true,
                    authenticateRoleGuid: val
                })

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

            if(res.data.state === 2) {
                const loginStatus = {...this.state.loginStatus}
                loginStatus.loading = false
                loginStatus.success = false
                loginStatus.error = true
                loginStatus.errorMsg = res.data.message

                this.setState({
                    loginStatus: loginStatus,
                    // registerStepTwoSwitch: true
                })

                toast('کاربر مورد نظر یافت نشد', {type: toast.TYPE.ERROR});
            }

            if(res.data.state === 3) {
                const loginStatus = {...this.state.loginStatus}
                loginStatus.loading = false
                loginStatus.success = false
                loginStatus.error = true
                loginStatus.errorMsg = res.data.message

                this.setState({
                    loginStatus: loginStatus,
                    // registerStepTwoSwitch: true
                })

                toast('حساب کاربر مورد نظر غیر فعال می باشد', {type: toast.TYPE.ERROR});
            }
        }).catch(err => {
            const loginStatus = {...this.state.loginStatus}
            loginStatus.loading = false
            loginStatus.success = false
            loginStatus.error = true
            loginStatus.errorMsg = err.message
            this.setState({loginStatus: loginStatus})

             toast('خطای شبکه', {type: toast.TYPE.ERROR})
        })
    }
    }

    loginCodeInputChangeHandler = (val) => {
        this.setState({loginStep2CodeValue: val})
    }

    loginCheckboxChangeHandler = (val) => {
        this.setState({checked: val})

    }

    loginStep2ClickHandler = () => {

        console.log(this.state.checked)

        const registerStep2Status = {...this.state.registerStep2Status}
        registerStep2Status.loading = true
        registerStep2Status.success = false
        registerStep2Status.error = false

        this.setState({
            registerStep2Status: registerStep2Status,
        })

        axios.post('http://185.94.97.164/api/Account/Authenticate', {
            phoneNumber: this.state.loginPhoneNumberValue,
            smsToken: this.state.loginStep2CodeValue,
            rememberMe: this.state.checked,
            roleGuid: this.state.authenticateRoleGuid
        }).then(res => {

            console.log(res)

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

                toast('ورود موفقیت آمیز بود', {type: toast.TYPE.SUCCESS})

                const { cookies } = this.props;
                
                if(this.state.checked){
                    cookies.set('token', res.data.token, {path: '/'});
                }else{
                    cookies.set('token', res.data.token, {path: '/'});
                }
                if(this.state.authenticateRoleGuid === '959b10a3-b8ed-4a9d-bdf3-17ec9b2ceb15') {
                    cookies.set('contractorOrClient', 'contractor', {path: '/'});
                }else{
                    cookies.set('contractorOrClient', 'client', {path: '/'});
                }

                this.props.history.replace('/')

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
                toast('کد وارد شده صحیح نمی باشد', {type: toast.TYPE.ERROR})
            }

        }).catch(err => {
            const registerStep2Status = {...this.state.registerStep2Status}
            registerStep2Status.loading = false
            registerStep2Status.success = false
            registerStep2Status.error = true
            registerStep2Status.errorMsg = err.message
            this.setState({registerStep2Status: registerStep2Status})

            toast('خطای شبکه', {type: toast.TYPE.ERROR})
        })
    }

    contractorLoginModalShowHandler = () => {
        this.setState({
            contractorLoginModalHidden: false
        })
    }

    contractorLoginModalHideHandler = () => {
        this.setState({
            contractorLoginModalHidden: true
        })
    }


    render() {
        // console.log(this.state.checked)

        return (
            <>

            <div className={classes.loginKeeper}>
                <PerfectScrollbar >
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
                                    onClick={() => this.setState({ loginRegisterSwitch: true, loginPhoneNumberValidMsg: '' })}>
                                    مشتری
                                </button>
                                <button className={classes.registerboxButtonForContractor}
                                    onClick={() => this.contractorLoginModalShowHandler()}>
                                    متخصص
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
                                    onClick={() => this.setState({ 
                                        loginRegisterSwitch: false,
                                        registerNameValidMsg: '',
                                        registerFamlyValidMsg: '',
                                        cityValidMsg: '',
                                        registerPhoneNumberValidMsg: ''
                                    })}>
                                    ورود
                                </button>
                            </div>

                            <div className = {
                                this.state.loginRegisterSwitch === false ?
                                    classes.loginRegisterLoginBox
                                    : !this.state.registerBoxMinHeight ?
                                    classes.loginRegisterRegisterBox :
                                    classes.loginRegisterRegisterBoxMinHeight
                            }>

                                {this.state.loginRegisterSwitch === false ?
                                    <LoginBixSteps
                                    loginPhoneNumberValue={this.state.loginPhoneNumberValue}
                                    loginStepTwoSwitch={this.state.loginStepTwoSwitch}
                                    minutes2={this.state.minutes2}
                                    seconds2={this.state.seconds2}
                                    registerStep2Status={this.state.registerStep2Status}
                                    loginPhoneNumberValidMsg={this.state.loginPhoneNumberValidMsg}
                                    loginStatus={this.state.loginStatus}
                                    loginCodeInputChangeHandler={val => this.loginCodeInputChangeHandler(val)}
                                    loginStep2ClickHandler={this.loginStep2ClickHandler}
                                    loginStep2BackHandler={this.loginStep2BackHandler}
                                    loginPhoneNumberChangeHandler={this.loginPhoneNumberChangeHandler}
                                    handleSellerByerSubmit={this.handleSellerByerSubmit}
                                    checked={this.state.checked}
                                    loginCheckboxChangeHandler={val => this.loginCheckboxChangeHandler(val)}
                                    />
                                    :
                                    <RegisterBoxSteps 
                                    registerStepTwoSwitch={this.state.registerStepTwoSwitch}
                                    registerReactCodeInputCganger={val => this.registerReactCodeInputCganger(val)}
                                    minutes={this.state.minutes}
                                    seconds={this.state.seconds}
                                    registerStep2ClickHandler={this.registerStep2ClickHandler}
                                    registerStep2Status={this.state.registerStep2Status}
                                    registerStep2BackHandler={this.registerStep2BackHandler}
                                    registerNameValidMsg={this.state.registerNameValidMsg}
                                    registerNameChangeHandler={this.registerNameChangeHandler}
                                    registerNameValue={this.state.registerNameValue}
                                    registerFamlyValidMsg={this.state.registerFamlyValidMsg}
                                    registerFamilyChangeHandler={this.registerFamilyChangeHandler}
                                    registerFamlyValue={this.state.registerFamlyValue}
                                    cityValidMsg={this.state.cityValidMsg}
                                    countriesLoading={this.state.countriesLoading}
                                    countries={this.state.countries}
                                    countryChanger={val => this.countryChanger(val)}
                                    citiesLoading={this.state.citiesLoading}
                                    cities={this.state.cities}
                                    cityChanger={val => this.cityChanger(val)}
                                    genderValue={this.state.genderValue}
                                    genderChanger={val => this.genderChanger(val)}
                                    registerPhoneNumberValidMsg={this.state.registerPhoneNumberValidMsg}
                                    registerPhoneNumberChangeHandler={this.registerPhoneNumberChangeHandler}
                                    registerPhoneNumberValue={this.state.registerPhoneNumberValue}
                                    registerStep1ClickHandler={this.registerStep1ClickHandler}
                                    registerStatus={this.state.registerStatus}
                                    /> 
                                }
                            </div>
                        </div>
                    </div>

                </PerfectScrollbar>
            </div>

            <ContractorLoginModal
            hidden={this.state.contractorLoginModalHidden}
            hideHandler={this.contractorLoginModalHideHandler}
            />

            <ToastContainer
                autoClose={4000}
                position={toast.POSITION.TOP_RIGHT}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnVisibilityChange={false}
                pauseOnHover={false}
                rtl/>
            </>
        );
    }
}


export default withRouter(withCookies(LoginPage))