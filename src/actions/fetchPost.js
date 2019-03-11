import {CALL_API} from '../middleware/api';

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_POST_REQUEST
    }
}


function doRequest(id) {
    return {
        [CALL_API]: {
            endpoint: '/posts/' + id,
            types: {
                successType: FETCH_POST_SUCCESS,
                errorType: FETCH_POST_FAILURE
            }
        }
    }
}

export function fetchPost(id) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(id));
    }
}