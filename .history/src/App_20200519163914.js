import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))
const Chat = lazy(() => import('./components/chat/Chat'))


function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  console.log(cookies.token);
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
                <Chat />
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
