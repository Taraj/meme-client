import {CALL_API} from '../middleware/api';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_REQUEST = 'AUTH_REQUEST';



export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

function prepareAuthRequest() {
    return {
        type: AUTH_REQUEST
    }
}

function doLoginRequest(username, password) {
    return {
        [CALL_API]: {
            endpoint: '/auth/login',
            types: {
                successType: AUTH_SUCCESS,
                errorType: AUTH_FAILURE
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


function doRegisterRequest(nickname, username, email, password) {
    return {
        [CALL_API]: {
            endpoint: '/auth/register',
            types: {
                successType: AUTH_SUCCESS,
                errorType: AUTH_FAILURE
            },
            config: {
                method: 'POST',
                body: JSON.stringify({
                    nickname: nickname,
                    username: username,
                    email: email,
                    password: password,
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
        dispatch(prepareAuthRequest());
        dispatch(doLoginRequest(username, password));
    }
}

export function register(nickname, username, email, password) {
    return dispatch => {
        dispatch(prepareAuthRequest());
        dispatch(doRegisterRequest(nickname, username, email, password));
    }
}


export function logout() {
    return {
        type: LOGOUT_REQUEST
    }
}