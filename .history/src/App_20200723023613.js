import React, {lazy, Suspense, Component} from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const PaymentPage = lazy(() => import('./components/paymentPage/PaymentPage'))
const LoginPage = lazy(() => import('./components/login/Login'))
const ClientChat = lazy(() => import('./components/clientChat/ClientChat'))
const ContractorChat = lazy(() => import('./components/contractorChat/ContractorChat'))


const PrivateRoute = ({component: Component, token, ...rest}) => (
  <Route 
  {...rest}
  render={props => {
    token !== undefined ?
    <Suspense fallback={<div className="lds-dual-ring"></div>}>
      <Component {...props} />
    </Suspense>
    :
    <Redirect to="/login" />
  }}
  />
)

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'contractorOrClient']);

  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      removeCookie('token', {path: '/'})
    }
    return error;
  });


  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          
        </Switch>
        //  renderRoutes()
        // cookies.token !== undefined ?
        // <>
        //   <Route path="/" exact render={() => (
        //     <Suspense fallback={<div className="lds-dual-ring"></div>}>
        //       {cookies.contractorOrClient === 'client' ?
        //         <ClientChat />
        //         :
        //         <ContractorChat />
        //       }
        //     </Suspense>
        //   )} />
        //   <Route path="/payment" exact render={() => (
        //     <Suspense fallback={<div className="lds-dual-ring"></div>}>
        //       <PaymentPage />
        //     </Suspense>
        //   )} />
        //   </>
        //   : 
        //   <>
        //   <Route path="/login" exact render={() => (
        //     <Suspense fallback={<div className="lds-dual-ring"></div>}>
        //       <LoginPage />
        //     </Suspense>
        //   )} />
        //   <Route path="/payment" exact render={() => (
        //     <Suspense fallback={<div className="lds-dual-ring"></div>}>
        //       <PaymentPage />
        //     </Suspense>
        //   )} />
        //   </>

      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
