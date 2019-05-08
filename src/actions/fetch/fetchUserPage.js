import {CALL_API} from '../../middleware/api';

export const FETCH_USER_DETAILS_REQUEST = 'FETCH_USER_DETAILS_REQUEST';
export const FETCH_USER_DETAILS_SUCCESS = 'FETCH_USER_DETAILS_SUCCESS';
export const FETCH_USER_DETAILS_FAILURE = 'FETCH_USER_DETAILS_FAILURE';

export const FETCH_USER_POSTS_REQUEST = 'FETCH_USER_POSTS_REQUEST';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';


function prepareUserDetailsRequest() {
    return {
        type: FETCH_USER_DETAILS_REQUEST
    }
}

function prepareUserPostsRequest() {
    return {
        type: FETCH_USER_POSTS_REQUEST
    }
}

function fetchUserDetailsRequest(nickname) {
    return {
        [CALL_API]: {
            endpoint: '/users/' + nickname,
            types: {
                successType: FETCH_USER_DETAILS_SUCCESS,
                errorType: FETCH_USER_DETAILS_FAILURE
            }
        }
    }
}

function fetchUserPostsRequest(nickname, page) {
    return {
        [CALL_API]: {
            endpoint: '/users/' + nickname + '/posts?confirmed=true&offset=' + 10 * (page - 1),
            types: {
                successType: FETCH_USER_POSTS_SUCCESS,
                errorType: FETCH_USER_POSTS_FAILURE
            }
        }
    }
}


export function fetchUserDetails(nickname) {
    return dispatch => {
        dispatch(prepareUserDetailsRequest());
        dispatch(fetchUserDetailsRequest(nickname));
    }
}

export function fetchUserPosts(nickname, page) {
    return dispatch => {
        dispatch(prepareUserPostsRequest());
        dispatch(fetchUserPostsRequest(nickname, page));
    }
}