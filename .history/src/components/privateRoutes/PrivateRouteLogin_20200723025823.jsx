import React from 'react'
import { useCookies } from 'react-cookie';

function PrivateRouteLogin() {
    return (
        <Route 
        {...rest}
        render={props =>
            token === undefined ? (
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
