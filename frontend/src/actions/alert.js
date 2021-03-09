import {SET_ALERT, REM_ALERT} from './types';
import {v4 as uuid} from 'uuid';

export const setalert = (msg, alerttype) => dispatch => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alerttype, id}
    });
    setTimeout(()=> {
        dispatch({
            type: REM_ALERT,
            payload: id
        })
    },2000);
}
