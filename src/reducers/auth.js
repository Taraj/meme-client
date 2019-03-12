import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST} from '../actions/auth';

export function auth(state = {
    isAuthenticated: !!localStorage.getItem('id_token'),
    data: null,
    error: null
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('id_token', action.response.accessToken);
            return Object.assign({}, state, {
                isAuthenticated: true,
                data: {
                    nickname: action.response.nickname,
                    role: action.response.accountType
                },
                error: null
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: action.error
            });
        case LOGIN_REQUEST:
            localStorage.removeItem('id_token');
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: null
            });
        case LOGOUT_REQUEST:
            localStorage.removeItem('id_token');
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: null
            });
        default:
            return state
    }
}