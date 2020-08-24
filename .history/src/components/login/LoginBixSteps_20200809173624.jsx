import React from 'react'
import ReactCodeInput from 'react-code-input'
import './checkbox.css'
import classes from './login.module.css'


const LoginBixSteps = (props) => {
    let [check, setCheck] = React.useState(true)

    const loginCheckboxChange = () => {
        setCheck(!check)
        props.loginCheckboxChangeHandler(!check)
    }

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

                <p className={classes.loginCcheckKeeper}>
                    <input type="checkbox" id="test1"
                    // defaultChecked={true}
                    checked={check}
                    onChange={() => loginCheckboxChange()} />
                    <label htmlFor="test1">
                        مرا بخاطر بسپار
                    </label>
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
                'ورود متخصص'}
            </button>
            <button type="button"
                onClick={() => props.handleSellerByerSubmit('91b3cdab-39c1-40fb-b077-a2d6e611f50a')}
                disabled={props.loginStatus.loading}
                className={classes.loginRegisterLoginButtonByer}>
                {props.loginStatus.loading ?
                'صبور باشید' :
                'ورود مشتری'}
            </button>
            </div>
            }
        </div>
    )
}

export default LoginBixSteps
