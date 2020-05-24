import React, {lazy, Suspense} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))
const Chat = lazy(() => import('./components/chat/Chat'))


function App() {

  const [cookies, setCookie] = useCookies(['token']);
  
  if(cookies.token !== null) {
    console.log('its trueeee');
  } else{
    console.log('its Null');
  }

  return (
    <BrowserRouter>
      <React.Fragment>
          <Switch>

          {/* {cookies.token !== null ? */}
            <Route path="/" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <Chat />
              </Suspense>
            )} />
            {/* : */}
            <Route path="/login" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />
          {/* }  */}

          {/* <Route render={() => <div>سیشسیشسیشسی</div>} /> */}

          </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
