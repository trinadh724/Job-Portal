import {combineReducers} from 'redux';
import alert from './alert';
import authReducer from './authReducer';
import profile from './profile';
import jobs from './jobs';
import applications from './applications';


export default combineReducers({
    alert,
    authReducer,
    profile,
    jobs,
    applications,
});