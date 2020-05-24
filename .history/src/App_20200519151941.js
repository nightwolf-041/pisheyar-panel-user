import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))
const Chat = lazy(() => import('./components/chat/Chat'))


function App() {

  const [cookies, setCookie] = useCookies(['name']);
  
  return (
    <BrowserRouter>
      <React.Fragment>
        {/* <AuthProvider> */}
          <Switch>

            <Route path="/login" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />

            <Route path="/" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <Chat />
              </Suspense>
            )} />

          </Switch>
        {/* </AuthProvider> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
