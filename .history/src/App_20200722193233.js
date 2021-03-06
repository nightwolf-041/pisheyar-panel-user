import React, {lazy, Suspense} from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

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

  return (
    <BrowserRouter>
      <React.Fragment>

          {cookies.token === undefined ?
            <Route path="/login" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />
            : <Redirect to="/" />
          }

          {cookies.token !== undefined ?
            <Route path="/" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                {cookies.contractorOrClient === 'client' ?
                  <ClientChat />
                  :
                  <ContractorChat />
                }
              </Suspense>
            )} />
            : <Redirect to="/login" />
          }

      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
