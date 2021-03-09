import {ADDED_NEW_APPLICATION, FAILED_TO_ADD_NEW_APPLICATION, GOT_ALL_APPLICATION, FAILED_TO_GET_ALL_APPLICATION, GOT_ALL_APPLICATION_STATUS, FAILED_TO_GET_ALL_APPLICATION_STATUS } from './types';
import axios from 'axios';
import { setalert } from './alert';
import {loaduserusingtoken} from './auth';


export const newApplication = (formData) => async dispatch => {
    try {
        // console.log('Trinadh Is Great');
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
        // console.log('Trinadh Is Great');
            const data = JSON.stringify(formData);
            const response = await axios.post('/appjobs', data, config);
            dispatch({
                type: ADDED_NEW_APPLICATION,
                payload: response.data
            });
            dispatch(setalert('New Application Created', 'danger'));
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: FAILED_TO_ADD_NEW_APPLICATION,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
} 


export const getApplications = () => async dispatch => {
    try {
            const response = await axios.get('/appjobs');
            dispatch({
                type: GOT_ALL_APPLICATION,
                payload: response.data
            });
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: FAILED_TO_GET_ALL_APPLICATION,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
} 


export const getApplicationsById = (id) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
                    const data = JSON.stringify({id});
            const response = await axios.post('/appjobs/id', data, config);        
            dispatch({
                type: GOT_ALL_APPLICATION,
                payload: response.data
            });
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: FAILED_TO_GET_ALL_APPLICATION,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
} 



export const changeStatus = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
                    const data = JSON.stringify(formData);
            const response = await axios.post('/appjobs/statusupdate', data, config);        
            dispatch({
                type: GOT_ALL_APPLICATION_STATUS,
                payload: response.data
            });
        dispatch(setalert('Status is changed', 'danger'));
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: FAILED_TO_GET_ALL_APPLICATION_STATUS,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
} 