import { DELETE_JOB, ERROR_WHILE_DELETING_JOB, ERROR_LOADING_JOB, LOADED_JOB, ADD_NEW_JOB, ERROR_ADDING_JOB, GOT_JOBS, ERROR_GETTING_JOB, EDITED_JOB, FAILED_EDITING_JOB, GET_ALL_JOBS} from './types';
import axios from 'axios';
import { setalert } from './alert';
import {loaduserusingtoken} from './auth';


export const addNewJob = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        };
        let response;
        const data = JSON.stringify(formData);
        response = await axios.post('/jobs', data, config);
        dispatch({
            type: ADD_NEW_JOB,
            payload: response.data
        });
        dispatch(setalert('Added Job Sucesfully', 'danger'));
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: ERROR_ADDING_JOB,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
};


export const getJobs = () => async dispatch => {
    try {
        const response = await axios.get('/jobs');
        dispatch({
            type: GOT_JOBS,
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
            type: ERROR_GETTING_JOB,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
}

export const deleteJob = (id) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        };
        let response;
        let data = JSON.stringify({id});
        response = await axios.post('/jobs/delete', data, config);
        
        dispatch({
            type: DELETE_JOB,
            payload: response.data
        });
        dispatch(setalert('Deleted Job', 'danger'));
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: ERROR_GETTING_JOB,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        }); 
    }
}

export const loadJobWithId = (id) => async dispatch => {
    try {
        // console.log('jelo');
        const config = {
        headers: {
          'Content-Type': 'application/json'
        },
    }
        const data = JSON.stringify({id});
        let response = await axios.post('/jobs/id',data, config);
        // console.log(response.data);
        dispatch({
            type: LOADED_JOB,
            payload: response.data
        });
        // console.log(response.data);
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: ERROR_LOADING_JOB,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });

    }
} 

export const editJob = (formdata) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        }
            const data = JSON.stringify(formdata);
            const response = await axios.post('/jobs/update', data, config);
            dispatch({
                type: EDITED_JOB,
                payload: response.data
            })
            dispatch(setalert('Edited Profile Sucessfully', 'danger'));
        
    } catch (err) {
        let errors;
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: FAILED_EDITING_JOB,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
}
