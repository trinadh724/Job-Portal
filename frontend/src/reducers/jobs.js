/* eslint-disable import/no-anonymous-default-export */
import {  DELETE_JOB, ERROR_WHILE_DELETING_JOB, LOADED_JOB, ERROR_LOADING_JOB, ADD_NEW_JOB, ERROR_ADDING_JOB, GOT_JOBS, ERROR_GETTING_JOB, EDITED_JOB, FAILED_EDITING_JOB} from '../actions/types';

const initialState = {
    jobs: null,
    cjob: null,
    error: null,
    loading: true
};


export default function(State = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOADED_JOB:
        case EDITED_JOB:
            return {...State, loading: false, cjob: payload};
        case ADD_NEW_JOB:
        case GOT_JOBS:
        case DELETE_JOB:
            return {...State, loading: false, jobs: payload, cjob: null};
        case ERROR_ADDING_JOB:
        case ERROR_GETTING_JOB:
        case ERROR_LOADING_JOB:
        case ERROR_WHILE_DELETING_JOB:
            return {...State, loading: false, error: payload, cjob: null};
        case FAILED_EDITING_JOB:
            return {...State, loading: false, error: payload};
        default:
            return State;
    }
}
