/* eslint-disable import/no-anonymous-default-export */
import {EDITED_PROFILE, ERROR_IN_UPDATING_PROFILE,  CLEAR_PROFILE , GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, ADD_EDUCATION, ERROR_IN_ADDING_EDUCATION, GET_EDUCATION_LIST, ERROR_IN_GETTING_EDUCATIONS, DELETED_EDUCATION, FAILED_TO_DELETE_EDUCATION} from '../actions/types';

const initialState = {
    profile: null,
    error: null,
    loading: true
};

export default function(State = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE_SUCCESS:
        case EDITED_PROFILE:
            return {...State, loading: false, profile: payload, error: null};
        case ADD_EDUCATION:
        case GET_EDUCATION_LIST:
        case DELETED_EDUCATION:
            let dup = State.profile;
            return {...State, loading: false, profile: {...dup,education: payload}, error: null};
        case GET_PROFILE_FAILURE:
        case ERROR_IN_UPDATING_PROFILE:
        case ERROR_IN_ADDING_EDUCATION:
        case ERROR_IN_GETTING_EDUCATIONS:
        case FAILED_TO_DELETE_EDUCATION:
            return {...State, loading: false, error: payload};
        case CLEAR_PROFILE:
            return {...State, loading:false, profile: null, error: null};
        default:
            return State;
    }
}   