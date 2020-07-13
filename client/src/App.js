import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Verification from './components/auth/Verification'
import AuthState from './context/auth/AuthState'
import User from './components/Pages/Useraccess'
import AssignState from './context/assignments/AssignState'
import Uploads from './components/Pages/Uploads'
import Recent from './components/Pages/Recent'
import Solutions from './components/Pages/Solutions'
import ForgotPassword from './components/auth/ForgotPassword'
import App1 from './components/landing/src/App'
// import './components/landing/src/assets/scss/style.scss'
const App = () => {
  return (
    <AuthState>
      <AssignState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path='/' component={App1} />
              <Route exact path='/forgotPassword' component={ForgotPassword} />
              <Route exact path="/User" component={User} />
              <Route exact path="/User/upload" component={Uploads} />
              <Route exact path="/User/recent" component={Recent} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/verification" component={Verification} />
              <Route exact path="/User/solutions" component={Solutions} />
            </Switch>
          </Fragment>
        </Router>
      </AssignState>
    </AuthState>
  );
}

export default App;
