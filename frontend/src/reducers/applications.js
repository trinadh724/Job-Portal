/* eslint-disable import/no-anonymous-default-export */
import {ADDED_NEW_APPLICATION, FAILED_TO_ADD_NEW_APPLICATION, GOT_ALL_APPLICATION, FAILED_TO_GET_ALL_APPLICATION, GOT_ALL_APPLICATION_STATUS, FAILED_TO_GET_ALL_APPLICATION_STATUS} from '../actions/types';
const initialState = {
    applications: null,
    error: null,
    loading: true
};

export default function(State = initialState, action){
    const {type, payload} = action;
    switch(type){
        case ADDED_NEW_APPLICATION:
        case GOT_ALL_APPLICATION:
        case GOT_ALL_APPLICATION_STATUS:
            return {...State, loading: false, applications: payload};
        case FAILED_TO_ADD_NEW_APPLICATION:
        case FAILED_TO_GET_ALL_APPLICATION:
        case FAILED_TO_GET_ALL_APPLICATION_STATUS:
            return {...State, loading: false, error: payload};
         default:
             return State;   
    }
}