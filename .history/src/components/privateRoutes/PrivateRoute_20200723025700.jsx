import React from 'react'

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
