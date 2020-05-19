import React from 'react'
import Select from 'react-select'
import ReactCodeInput from 'react-code-input'
import classes from '/login.module.css'


const RegisterBoxSteps = (props) => {
    return (
        <div>
            <h4 className={classes.loginRegisterRegisterHead}>
                {props.registerStepTwoSwitch ?
                'کد دریافتی را وارد کنید' :
                'ثبت نام'
                }
            </h4>

        

            {props.registerStepTwoSwitch ?
        
            <div className={classes.loginRegisterLoginForm}>
                <ReactCodeInput type='tezt'  fields={6} onChange={val => props.registerReactCodeInputCganger(val)} />

                <div className={classes.timerBox}>
                    <span>
                        {props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}
                    </span>
                </div>
                
                <div className={classes.registerStep2Buttonsbox}>
                    <button type="submit"
                    onClick={props.registerStep2ClickHandler}
                    disabled={props.registerStep2Status.loading}
                    className={classes.registerStep2Button}>
                    {props.registerStep2Status.loading ?
                    'صبور باشید' :
                    'ثبت نهایی'}
                    </button>

                    <button type="button"
                    onClick={props.registerStep2BackHandler}
                    disabled={props.registerStep2Status.loading}
                    className={classes.registerStep2BackButton}>
                        بازگشت
                    </button>
                </div>
            </div>
            
            :
            <>
            <div className={classes.loginRegisterRegisterForm}>

                <input
                    className={!props.registerNameValidMsg ?
                    classes.loginRegisterRegisterName :
                    classes.loginRegisterRegisterNameInvalid}
                    type="text"
                    name="name"
                    onChange={props.registerNameChangeHandler}
                    // onBlur={handleBlur}
                    value={props.registerNameValue}
                    placeholder="نام"
                />
                {props.registerNameValidMsg && (
                    <div className={classes.registerNameErrorSpan}>{props.registerNameValidMsg}</div>
                )}

                <input
                    className={!props.registerFamlyValidMsg ?
                    classes.loginRegisterRegisterFamily :
                    classes.loginRegisterRegisterFamilyInvalid}
                    type="text"
                    name="name"
                    onChange={props.registerFamilyChangeHandler}
                    // onBlur={handleBlur}
                    value={props.registerFamlyValue}
                    placeholder="نام خانوادگی"
                />
                {props.registerFamlyValidMsg && (
                    <div className={classes.registerFamilyErrorSpan}>{props.registerFamlyValidMsg}</div>
                )}

                <div className={classes.loginRegisterRegisterSelectsbox}>
                    <Select
                        inputId="loginRegisterRegisterSelectContry"
                        instanceId="loginRegisterRegisterSelectContry"
                        placeholder="استان"
                        className={!props.cityValidMsg ?
                            classes.loginRegisterRegisterSelectContry :
                            classes.loginRegisterRegisterSelectContryInvalid
                        }
                        // defaultValue={props.countryValue}
                        label="Single select"
                        // loadingMessage="درال بارگیری"
                        isRtl={true}
                        isLoading={props.countriesLoading}
                        loadingMessage={() => "درحال بارگیری..."}
                        noOptionsMessage={() => "نتیجه ای یافت نشد"}
                        styles={props.customStyles}
                        options={props.countries}
                        onChange={val => props.countryChanger(val)}
                    />
                    <Select
                        inputId="loginRegisterRegisterSelectCity"
                        instanceId="loginRegisterRegisterSelectCity"
                        placeholder="شهر"
                        className={!props.cityValidMsg ?
                            classes.loginRegisterRegisterSelectCity : 
                            classes.loginRegisterRegisterSelectCityInvalid
                        }
                        // defaultValue={props.cityValue}
                        label="Single select"
                        isRtl={true}
                        isLoading={props.citiesLoading}
                        loadingMessage={() => "درحال بارگیری..."}
                        noOptionsMessage={() => "نتیجه ای یافت نشد"}
                        styles={props.customStyles}
                        options={props.cities}
                        onChange={val => props.cityChanger(val)}
                    />
                </div>
                {props.cityValidMsg && (
                    <div className={classes.registerCityErrorSpan}>{props.cityValidMsg}</div>
                )}

                <Select
                    inputId="loginRegisterRegisterSelectGender"
                    instanceId="loginRegisterRegisterSelectGender"
                    placeholder="جنسیت"
                    className={classes.loginRegisterRegisterSelectGender}
                    defaultValue={props.genderValue}
                    label="Single select"
                    isRtl={true}
                    // isLoading={props.countriesLoading}
                    loadingMessage={() => "درحال بارگیری..."}
                    noOptionsMessage={() => "نتیجه ای یافت نشد"}
                    styles={props.customStyles}
                    options={props.genders}
                    onChange={val => props.genderChanger(val)}
                />

                <input
                    className={!props.registerPhoneNumberValidMsg ?
                    classes.loginRegisterRegisterPhoneNumber :
                    classes.loginRegisterRegisterPhoneNumberInvalid}
                    type="text"
                    name="password"
                    onChange={props.registerPhoneNumberChangeHandler}
                    // onBlur={handleBlur}
                    value={props.registerPhoneNumberValue}
                    placeholder="شماره موبایل"
                />

                {props.registerPhoneNumberValidMsg && (
                    <div className={classes.registerPhoneNumberErrorSpan}>{props.registerPhoneNumberValidMsg}</div>
                )}

                <button type="button"
                onClick={props.registerStep1ClickHandler}
                    disabled={props.registerStatus.loading}
                    className={classes.loginRegisterRegisterButton}>
                    {props.registerStatus.loading ?
                    'صبور باشید':
                    'ثبت نام'}
                </button>
                </div>
            {/* <div className={classes.registerBottomShadowBox}></div> */}
            </>
        }
    </div>
    )
}

export default RegisterBoxSteps
