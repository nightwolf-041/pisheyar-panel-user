import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function PrivateRouteLogin() {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'contractorOrClient']);

    return (
        <Route 
        {...rest}
        render={props =>
            cookies.token === undefined ? (
            <Suspense fallback={<div className="lds-dual-ring"></div>}>
            <Component {...props} />
            </Suspense> )
            :
            <Redirect to="/" />
        }
        />
    )
}

export default PrivateRouteLogin
