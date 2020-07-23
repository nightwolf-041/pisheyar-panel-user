import React, {lazy, Suspense, Component} from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import PrivateRoute from './components/privateRoutes/PrivateRoute'
import PrivateRouteLogin from './components/privateRoutes/PrivateRouteLogin'
import NotFound from './components/notfound/NotFound'
import './App.css';

const PaymentPage = lazy(() => import('./components/paymentPage/PaymentPage'))
const LoginPage = lazy(() => import('./components/login/Login'))
const ClientChat = lazy(() => import('./components/clientChat/ClientChat'))
const ContractorChat = lazy(() => import('./components/contractorChat/ContractorChat'))


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

  const routes = [
    {path: '/', exact, component: PaymentPage},
    {path: '/', exact, component: PaymentPage},
    {path: '/', exact, component: PaymentPage},
  ]

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="lds-dual-ring"></div>}>
          <Switch>
              <Route path="/payment" exact component={PaymentPage} />
              <PrivateRoute path="/" exact
              component={ClientChat} component2={ContractorChat} />
              <PrivateRouteLogin path="/login" exact component={LoginPage} />
              <Route component={NotFound} />
          </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
