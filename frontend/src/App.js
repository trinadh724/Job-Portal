import React, { Fragment , useEffect} from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layouts/Alert';
import {setDefaultXAuthForToken} from './utils/setdefaultxauth';
import { loaduserusingtoken } from './actions/auth';
// Renaming Privateroute component to PrivateRoute
import PrivateRoute from './routes/PrivateRoute/Privateroute';
import EditProfile from './components/profile/EditProfile';
import Profile from './components/profile/Profile';
import AddEducation from './components/profile/AddEducation';
import AddJob from './components/dashboard/AddJob';
import EditJob from './components/dashboard/EditJob';
import ViewJob from './components/dashboard/ViewJob';
import AddSOP from './components/dashboard/AddSOP';
import MyApplications from './components/dashboard/MyApplications';
import AcceptedApplications from './components/dashboard/AcceptedApplications';


setDefaultXAuthForToken(localStorage.getItem('token'));

const App = () => {
  
  useEffect(()=> {
    store.dispatch(loaduserusingtoken());
  }, []);

  return (
    <Provider store ={store}>
      <Router>
    <Fragment className="App">
    <Navbar/>
      <Route exact path='/' component={Landing} />
      <section className= 'container'>
        <Alert/>
        <Switch>

      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/editprofile' component={EditProfile} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute exact path='/addeducation' component={AddEducation} />
      <PrivateRoute exact path='/addjob' component={AddJob} />
      <PrivateRoute exact path='/viewapplication/:id' component={ViewJob} />
      <PrivateRoute exact path='/editjob/:id' component={EditJob} />
      <PrivateRoute exact path='/sop/:id' component={AddSOP} />
      <PrivateRoute exact path='/myapplication' component={MyApplications} />
      <PrivateRoute exact path='/successjob' component={AcceptedApplications} />
      
          
        </Switch>
      </section>
  </Fragment>
    </Router>
    </Provider>
    
  );
}

export default App;
