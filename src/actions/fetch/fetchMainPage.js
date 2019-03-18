import {CALL_API} from '../../middleware/api';

export const FETCH_MAIN_PAGE_SUCCESS = 'FETCH_MAIN_PAGE_SUCCESS';
export const FETCH_MAIN_PAGE_FAILURE = 'FETCH_MAIN_PAGE_FAILURE';
export const FETCH_MAIN_PAGE_REQUEST = 'FETCH_MAIN_PAGE_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_MAIN_PAGE_REQUEST
    }
}


function doRequest(page) {
    return {
        [CALL_API]: {
            endpoint: '/posts?confirmed=true&offset=' + 10 * (page - 1),
            types: {
                successType: FETCH_MAIN_PAGE_SUCCESS,
                errorType: FETCH_MAIN_PAGE_FAILURE
            }
        }
    }
}

export function fetchMainPage(page) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(page));
    }
}