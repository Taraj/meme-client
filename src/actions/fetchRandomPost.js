import {CALL_API} from '../middleware/api';

export const FETCH_RANDOM_POST_SUCCESS = 'FETCH_RANDOM_POST_SUCCESS';
export const FETCH_RANDOM_POST_FAILURE = 'FETCH_RANDOM_POST_FAILURE';
export const FETCH_RANDOM_POST_REQUEST = 'FETCH_RANDOM_POST_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_RANDOM_POST_REQUEST
    }
}


function doRequest() {
    return {
        [CALL_API]: {
            endpoint: '/posts/random',
            types: {
                successType: FETCH_RANDOM_POST_SUCCESS,
                errorType: FETCH_RANDOM_POST_FAILURE
            }
        }
    }
}

export function fetchRandomPost() {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest());
    }
}