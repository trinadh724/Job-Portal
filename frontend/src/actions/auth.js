import { CLEAR_PROFILE,  REG_SUCC, REG_FAIL, Applicant , USER_LOADED, AUTH_FAILED, LOGIN_FAIL, LOGIN_SUCC, LOGOUT} from './types';
import axios from 'axios';
import { setalert } from './alert';
import {setDefaultXAuthForToken} from '../utils/setdefaultxauth';
import {getUserProfile} from './profile';

export const loaduserusingtoken = () => async dispatch => {
    setDefaultXAuthForToken(localStorage.getItem('token'));
    try {
        const response = await axios.get('/profile/me');
        dispatch({
            type: USER_LOADED,
            payload: response.data
        });
        // dispatch(getUserProfile);
    } catch (err) {
        dispatch({
            type: AUTH_FAILED
        });
    }
};

export const loginuser = ({password, email}) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
          };
        //   console.log(password);
        //   console.log(email);
        const newUser = {
            password,
            email
        };
        const userData = JSON.stringify(newUser);
        const response = await axios.post('/auth/login', userData, config);
        dispatch({
            type: LOGIN_SUCC,
            payload: response.data
        });
        dispatch(loaduserusingtoken());
    } catch (err) {
        let errors;
        if (err.response && err.response.data)
        {
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(loaduserusingtoken());
    }
};



export const registeruser = ({name, email, password, who}) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
          };
        const newUser = {
            name,
            email,
            password,
            who
        };
        const userData = JSON.stringify(newUser);
        let response;          
        if(who === Applicant){
            response = await axios.post('/applicant', userData, config);
        }
        else{
            response = await axios.post('/recruiter', userData, config);
        }
        dispatch({
            type: REG_SUCC,
            payload: response.data
        });
        dispatch(loaduserusingtoken());
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: REG_FAIL
        });
        dispatch(loaduserusingtoken());
    }
};


export const logoutuser = () => dispatch => {
    // console.log('I am here');
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    });
};