import React from 'react';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <CounterProvider>
          <Switch>

            <Route path="/login" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />

            <Route path="/chat" exact render={() => (
              <Suspense fallback={<div className="lds-dual-ring"></div>}>
                <LoginPage />
              </Suspense>
            )} />

          </Switch>
        </CounterProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
