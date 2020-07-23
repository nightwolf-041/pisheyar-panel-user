import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function PrivateRoute({component: Component, component2: Component2, token, ...rest}) {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'contractorOrClient']);

    return (
        <Route 
        {...rest}
        render={props =>
          cookies.token !== undefined ? (
          <Suspense fallback={<div className="lds-dual-ring"></div>}>
            {cookies.contractorOrClient === "client" ؟
            <Component {...props} />
            :
            <Component2 {...props} />
            }
          </Suspense> )
          :
          <Redirect to="/login" />
        }
        />
    )
}

export default PrivateRoute
