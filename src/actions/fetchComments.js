import {CALL_API} from '../middleware/api';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_COMMENTS_REQUEST
    }
}


function doRequest(id) {
    return {
        [CALL_API]: {
            endpoint: '/posts/' + id + '/comments',
            types: {
                successType: FETCH_COMMENTS_SUCCESS,
                errorType: FETCH_COMMENTS_FAILURE
            }
        }
    }
}

export function fetchComments(id) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(id));
    }
}