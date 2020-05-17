import React from 'react';
import './App.css';

const LoginPage = lazy(() => import('./components/login/Login'))

function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<div className="lds-dual-ring"></div>}>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
          </Switch>
        </Suspense>
    </BrowserRouter>
  );
}

export default App;
