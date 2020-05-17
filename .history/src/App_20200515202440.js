import React from 'react';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))

function App() {
  return (
    <BrowserRouter>
    <React.fragment></React.fragment>
          <Switch>
            <Route path="/login" exact render={() => (
            <Suspense fallback={<div className="lds-dual-ring"></div>}>
              <LoginPage />
            </Suspense>
          )} />
          </Switch>
    </BrowserRouter>
  );
}

export default App;
