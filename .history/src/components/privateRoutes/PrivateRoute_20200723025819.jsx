import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function PrivateRoute() {
    return (
        <Route 
        {...rest}
        render={props =>
          token !== undefined ? (
          <Suspense fallback={<div className="lds-dual-ring"></div>}>
            <Component {...props} />
          </Suspense> )
          :
          <Redirect to="/login" />
        }
        />
    )
}

export default PrivateRoute
