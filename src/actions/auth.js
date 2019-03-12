import {CALL_API} from '../middleware/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

function prepareLoginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}


function doLoginRequest(username, password) {
    return {
        [CALL_API]: {
            endpoint: '/auth/login',
            types: {
                successType: LOGIN_SUCCESS,
                errorType: LOGIN_FAILURE
            },
            config: {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }
        }
    }
}

export function login(username, password) {
    return dispatch => {
        dispatch(prepareLoginRequest());
        dispatch(doLoginRequest(username, password));
    }
}

export function logout() {
    return {
        type: LOGOUT_REQUEST
    }
}