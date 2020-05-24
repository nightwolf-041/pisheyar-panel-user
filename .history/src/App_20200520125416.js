import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))
const ClientChat = lazy(() => import('./components/clientChat/ClientChat'))


function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'contractorOrClient']);
  console.log(cookies.token);
  console.log(cookies.contractorOrClient);
  // removeCookie('token', {path: '/'})

  return (
    <BrowserRouter>
      <React.Fragment>
          {/* <Switch> */}

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
                  <ChatContractor />
                }
              </Suspense>
            )} />
            : <Redirect to="/login" />
          }

          {/* </Switch> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
