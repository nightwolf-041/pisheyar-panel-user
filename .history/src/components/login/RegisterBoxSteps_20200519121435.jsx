import React from 'react'
import ReactCodeInput from 'react-code-input'
import classes from '/login.module.css'


const RegisterBoxSteps = () => {
    return (
        <div>
            <h4 className={classes.loginRegisterRegisterHead}>
                {this.state.registerStepTwoSwitch ?
                'کد دریافتی را وارد کنید' :
                'ثبت نام'
                }
            </h4>

        

            {this.state.registerStepTwoSwitch ?
        
            <div className={classes.loginRegisterLoginForm}>
                <ReactCodeInput type='tezt'  fields={6} onChange={val => this.registerReactCodeInputCganger(val)} />

                <div className={classes.timerBox}>
                    <span>
                        {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}
                    </span>
                </div>
                
                <div className={classes.registerStep2Buttonsbox}>
                    <button type="submit"
                    onClick={this.registerStep2ClickHandler}
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
            </div>
            
            :
            <>
            <div className={classes.loginRegisterRegisterForm}>

                <input
                    className={!this.state.registerNameValidMsg ?
                    classes.loginRegisterRegisterName :
                    classes.loginRegisterRegisterNameInvalid}
                    type="text"
                    name="name"
                    onChange={this.registerNameChangeHandler}
                    // onBlur={handleBlur}
                    value={this.state.registerNameValue}
                    placeholder="نام"
                />
                {this.state.registerNameValidMsg && (
                    <div className={classes.registerNameErrorSpan}>{this.state.registerNameValidMsg}</div>
                )}

                <input
                    className={!this.state.registerFamlyValidMsg ?
                    classes.loginRegisterRegisterFamily :
                    classes.loginRegisterRegisterFamilyInvalid}
                    type="text"
                    name="name"
                    onChange={this.registerFamilyChangeHandler}
                    // onBlur={handleBlur}
                    value={this.state.registerFamlyValue}
                    placeholder="نام خانوادگی"
                />
                {this.state.registerFamlyValidMsg && (
                    <div className={classes.registerFamilyErrorSpan}>{this.state.registerFamlyValidMsg}</div>
                )}

                <div className={classes.loginRegisterRegisterSelectsbox}>
                    <Select
                        inputId="loginRegisterRegisterSelectContry"
                        instanceId="loginRegisterRegisterSelectContry"
                        placeholder="استان"
                        className={!this.state.cityValidMsg ?
                            classes.loginRegisterRegisterSelectContry :
                            classes.loginRegisterRegisterSelectContryInvalid
                        }
                        // defaultValue={this.state.countryValue}
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
                        className={!this.state.cityValidMsg ?
                            classes.loginRegisterRegisterSelectCity : 
                            classes.loginRegisterRegisterSelectCityInvalid
                        }
                        // defaultValue={this.state.cityValue}
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
                {this.state.cityValidMsg && (
                    <div className={classes.registerCityErrorSpan}>{this.state.cityValidMsg}</div>
                )}

                <Select
                    inputId="loginRegisterRegisterSelectGender"
                    instanceId="loginRegisterRegisterSelectGender"
                    placeholder="جنسیت"
                    className={classes.loginRegisterRegisterSelectGender}
                    defaultValue={this.state.genderValue}
                    label="Single select"
                    isRtl={true}
                    // isLoading={this.state.countriesLoading}
                    loadingMessage={() => "درحال بارگیری..."}
                    noOptionsMessage={() => "نتیجه ای یافت نشد"}
                    styles={customStyles}
                    options={genders}
                    onChange={val => this.genderChanger(val)}
                />

                <input
                    className={!this.state.registerPhoneNumberValidMsg ?
                    classes.loginRegisterRegisterPhoneNumber :
                    classes.loginRegisterRegisterPhoneNumberInvalid}
                    type="text"
                    name="password"
                    onChange={this.registerPhoneNumberChangeHandler}
                    // onBlur={handleBlur}
                    value={this.state.registerPhoneNumberValue}
                    placeholder="شماره موبایل"
                />

                {this.state.registerPhoneNumberValidMsg && (
                    <div className={classes.registerPhoneNumberErrorSpan}>{this.state.registerPhoneNumberValidMsg}</div>
                )}

                <button type="button"
                onClick={this.registerStep1ClickHandler}
                    disabled={this.state.registerStatus.loading}
                    className={classes.loginRegisterRegisterButton}>
                    {this.state.registerStatus.loading ?
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
