/* eslint-disable import/no-anonymous-default-export */
import { REG_SUCC, REG_FAIL , USER_LOADED, AUTH_FAILED, LOGIN_FAIL, LOGIN_SUCC, LOGOUT} from '../actions/types';


const defaultState = {
    token: localStorage.getItem('token'),
    userVerified: null,
    loading: true,
    user: null
}

export default function(State = defaultState, action){
    const { type , payload } = action;
    switch(type){
        case USER_LOADED:
            return {...State,userVerified: true, loading: false, user: payload};
        case REG_SUCC:
        case LOGIN_SUCC:
            localStorage.setItem('token', payload.token);
            return {...State,...payload, userVerified: true, loading: false};
        case REG_FAIL:
        case AUTH_FAILED:
        case LOGIN_FAIL:
        case LOGOUT:
            // console.log('hello I am here');
            localStorage.removeItem('token');
            return {...State,token: null, userVerified: false, loading: false, user: null};
        default:
            return State;
    }
};
