import React from 'react'
import ReactCodeInput from 'react-code-input'
import './login.css'
import classes from './login.module.css'


const LoginBixSteps = (props) => {
    return (
        <div>
            <h4 className={classes.loginRegisterLoginHead}>
                {props.loginStepTwoSwitch ?
                'کد دریافتی را وارد کنید'
                :
                'ورود'
                }
            </h4>

            {props.loginStepTwoSwitch ?
            
            <div className={classes.loginRegisterLoginForm}>

                <ReactCodeInput type='text' fields={6} onChange={val => props.loginCodeInputChangeHandler(val)} />

                <div className={classes.timerBox}>
                    <span>
                        {props.minutes2}:{props.seconds2 < 10 ? `0${props.seconds2}` : props.seconds2}
                    </span>
                </div>

                {/* <div className={[classes.loginCheckBoxKeeper, "form-check"].join(' ')}>
                    <label className="form-check-label" for="exampleCheck1">مرا به خاطر بسپار</label>
                    <input type="checkbox"
                    className={[classes.loginCheckBox, "form-check-input"].join(' ')} id="loginCheckBox"
                    onChange={props.loginCheckboxChange} />
                </div> */}
                {/* <p className={classes.loginCheckBoxKeeper}>
                    <input className={classes.loginCheckBoxInput}
                    type="checkbox" name="loginCheckBoxInput" id="loginCheckBox" />
                    <label className={classes.loginCheckBoxLabel}
                    for="loginCheckBox">مرا بخاطر بسپار</label>
                </p> */}
                <p>
                    <input type="checkbox" id="test1" />
                    <label for="test1">Red</label>
                </p>
                
                <div className={classes.registerStep2Buttonsbox}>
                    <button type="button"
                    onClick={props.loginStep2ClickHandler}
                    disabled={props.registerStep2Status.loading}
                    className={classes.loginStep2Button}>
                    ورود
                    </button>

                    <button type="button"
                    onClick={props.loginStep2BackHandler}
                    disabled={props.registerStep2Status.loading}
                    className={classes.loginStep2BackButton}>
                        بازگشت
                    </button>
                </div>
            </div>
                : 
        
            <div className={classes.loginRegisterLoginForm}>
                <input
                className={!props.loginPhoneNumberValidMsg ?
                    classes.loginRegisterLoginPhoneNumber
                    : classes.loginRegisterLoginPhoneNumberInvalid}
                type="text"
                name="loginMobile"
                onChange={props.loginPhoneNumberChangeHandler}
                // onBlur={handleBlur}
                value={props.loginPhoneNumberValue}
                placeholder="شماره موبایل"
            />
            {props.loginPhoneNumberValidMsg && (
                    <div className={classes.loginMobileErrorSpan}>{props.loginPhoneNumberValidMsg}</div>
                )
            }
            <button type="button"
                onClick={() => props.handleSellerByerSubmit('959b10a3-b8ed-4a9d-bdf3-17ec9b2ceb15')}
                disabled={props.loginStatus.loading}
                className={classes.loginRegisterLoginButton}>
                {props.loginStatus.loading ?
                'صبور باشید' :
                'ورود سرویس دهنده'}
            </button>
            <button type="button"
                onClick={() => props.handleSellerByerSubmit('91b3cdab-39c1-40fb-b077-a2d6e611f50a')}
                disabled={props.loginStatus.loading}
                className={classes.loginRegisterLoginButtonByer}>
                {props.loginStatus.loading ?
                'صبور باشید' :
                'ورود سرویس گیرنده'}
            </button>
            </div>
            }
        </div>
    )
}

export default LoginBixSteps
