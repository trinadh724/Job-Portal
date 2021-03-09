/* eslint-disable import/no-anonymous-default-export */
import {SET_ALERT, REM_ALERT} from '../actions/types'

const initial = [];
export default function(state = initial, action){
    const {type, payload} = action;
    
    switch(type){
        case SET_ALERT:
            return [...state , payload];
        case REM_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
};
