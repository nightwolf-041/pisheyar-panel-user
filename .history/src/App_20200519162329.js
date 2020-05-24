import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))
const Chat = lazy(() => import('./components/chat/Chat'))


function App() {

  const [cookies, setCookie] = useCookies(['token']);
  console.log(cookies.token);

  return (
    <BrowserRouter>
      <React.Fragment>
          {/* <Switch> */}

          {cookies.token === null ?
            <Route path="/login" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />
            : <Redirect to="/" />
          }

            <Route path="/" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <Chat />
              </Suspense>
            )} />

          {/* </Switch> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
