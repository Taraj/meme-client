import {AUTH_REQUEST, AUTH_FAILURE, AUTH_SUCCESS, LOGOUT_REQUEST} from '../actions/auth';


function initState() {
    if (localStorage.getItem('auth')) {
        const {nickname, admin} = JSON.parse(localStorage.getItem('auth'));
        return {
            isAuthenticated: true,
            data: {
                nickname: nickname,
                admin: admin
            },
            error: null
        }
    }
    return {
        isAuthenticated: false,
        data: null,
        error: null
    }
}


export function auth(state = initState(), action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            localStorage.setItem('auth', JSON.stringify({
                token: action.response.accessToken,
                admin: action.response.admin,
                nickname: action.response.nickname
            }));
            return Object.assign({}, state, {
                isAuthenticated: true,
                data: {
                    nickname: action.response.nickname,
                    admin: action.response.admin
                },
                error: null
            });
        case AUTH_FAILURE:
            localStorage.removeItem('auth');
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: action.error
            });
        case AUTH_REQUEST:
            localStorage.removeItem('auth');
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: null
            });
        case LOGOUT_REQUEST:
            localStorage.removeItem('auth');
            return Object.assign({}, state, {
                isAuthenticated: false,
                data: null,
                error: null
            });
        default:
            return state
    }
}