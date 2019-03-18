import {CALL_API} from '../../middleware/api';

export const FETCH_QUEUE_PAGE_SUCCESS = 'FETCH_QUEUE_PAGE_SUCCESS';
export const FETCH_QUEUE_PAGE_FAILURE = 'FETCH_QUEUE_PAGE_FAILURE';
export const FETCH_QUEUE_PAGE_REQUEST = 'FETCH_QUEUE_PAGE_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_QUEUE_PAGE_REQUEST
    }
}


function doRequest(page) {
    return {
        [CALL_API]: {
            endpoint: '/posts?confirmed=false&offset=' + 10 * (page - 1),
            types: {
                successType: FETCH_QUEUE_PAGE_SUCCESS,
                errorType: FETCH_QUEUE_PAGE_FAILURE
            }
        }
    }
}

export function fetchQueuePage(page) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(page));
    }
}