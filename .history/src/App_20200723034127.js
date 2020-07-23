import React, {lazy, Suspense, Component} from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/privateRoutes/PrivateRoute'
import PrivateRouteLogin from './components/privateRoutes/PrivateRouteLogin'
import NotFound from './components/notfound/NotFound'
import './App.css';

const PaymentPage = lazy(() => import('./components/paymentPage/PaymentPage'))
const LoginPage = lazy(() => import('./components/login/Login'))
const ClientChat = lazy(() => import('./components/clientChat/ClientChat'))
const ContractorChat = lazy(() => import('./components/contractorChat/ContractorChat'))


function App() {

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
          <BrowserRouter>
            <React.Fragment>
              <Switch>
                <Route path="/payment" exact render={() => (
                  <Suspense fallback={<div className="lds-dual-ring"></div>}>
                    <PaymentPage />
                  </Suspense>
                )} />
                <PrivateRoute path="/" exact
                component={ClientChat} component2={ContractorChat} />
                <PrivateRouteLogin path="/login" exact component={LoginPage} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          </BrowserRouter>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
