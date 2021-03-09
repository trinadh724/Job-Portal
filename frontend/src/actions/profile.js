import { GET_EDUCATION_LIST, ERROR_IN_GETTING_EDUCATIONS, ERROR_IN_ADDING_EDUCATION,  ADD_EDUCATION , EDITED_PROFILE, ERROR_IN_UPDATING_PROFILE,  GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, Applicant, FAILED_TO_DELETE_EDUCATION, DELETED_EDUCATION} from './types';
import axios from 'axios';
import { setalert } from './alert';
import {loaduserusingtoken} from './auth';


export const getUserProfile = () => async  dispatch => {
    try {
        const response = await axios.get('/profile/me');

        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: response.data
        });
        dispatch(getEducation());
    } catch (err) {
        dispatch({
            type: GET_PROFILE_FAILURE,
            payload: {msg: err.response && err.response.statusText ? err.response.statusText : '', status: err.response && err.response.status ? err.response.status : ''}
        });
    }
};

export const updateProfile = (profileData, {who}) => async dispatch => {
    try {
        // console.log(profileData);
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        };
        let response;
        const data = JSON.stringify(profileData);
        if(who === Applicant){
            response = await axios.post('/profile/me', data, config);
        }
        else{
            response = await axios.post('/profile/recruiter/me',data, config);
        }
        dispatch(setalert('Updated Profile', 'danger'));
        dispatch({
            type: EDITED_PROFILE,
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
            type: ERROR_IN_UPDATING_PROFILE,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

export const addEducation = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        };
        const data = JSON.stringify(formData);
        const response = await axios.post('/education', data, config);
        dispatch(setalert("Added education successfully", 'danger'));
        dispatch({
            type: ADD_EDUCATION,
            payload: response.data
        });
    } catch (err) {
        let errors;
        console.log(err);
        if(err.response && err.response.data){
            errors = err.response.data.errors;
        }
        if(errors){
            errors.forEach((error) => {dispatch(setalert(error.msg, 'danger'))});
        }
        dispatch({
            type: ERROR_IN_ADDING_EDUCATION,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


export const getEducation = () => async dispatch => {
    try {
        const response = await axios.get('/education');
        dispatch({
            type: GET_EDUCATION_LIST,
            payload: response.data
        });
    } catch (err) {
        dispatch(setalert('Failed to retrieve the educations of the user', 'danger'));
        dispatch({
            type: ERROR_IN_GETTING_EDUCATIONS
        })
    }
}

export const deleteEducation = (id) => async dispatch => {
    // console.log('heloiphone12')

    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
        };
        const data = JSON.stringify({id});
        // console.log(data);
        const response = await axios.post('/education/delete', data, config);
        dispatch({
            type: DELETED_EDUCATION,
            payload: response.data
        });
        dispatch(setalert('Deleted education', 'danger'));
    } catch (err) {
        console.log(err.response);
        dispatch(setalert('Failed to delete the education of the user', 'danger'));
        dispatch({
            type: FAILED_TO_DELETE_EDUCATION
        })
    }
}