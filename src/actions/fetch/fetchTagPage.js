import {CALL_API} from '../../middleware/api';

export const FETCH_TAG_PAGE_SUCCESS = 'FETCH_TAG_PAGE_SUCCESS';
export const FETCH_TAG_PAGE_FAILURE = 'FETCH_TAG_PAGE_FAILURE';
export const FETCH_TAG_PAGE_REQUEST = 'FETCH_TAG_PAGE_REQUEST';


function prepareRequest() {
    return {
        type: FETCH_TAG_PAGE_REQUEST
    }
}


function doRequest(tag, page) {
    return {
        [CALL_API]: {
            endpoint: '/tags/' + tag + '/posts?confirmed=true&offset=' + 10 * (page - 1),
            types: {
                successType: FETCH_TAG_PAGE_SUCCESS,
                errorType: FETCH_TAG_PAGE_FAILURE
            }
        }
    }
}

export function fetchTagPage(tag, page) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(tag, page));
    }
}