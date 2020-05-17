import React from 'react';
import LoginPage from './components/login/Login';
import './App.css';

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
