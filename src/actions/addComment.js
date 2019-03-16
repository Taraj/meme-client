import {CALL_API} from '../middleware/api';

export const ADD_COMMENTS_SUCCESS = 'ADD_COMMENTS_SUCCESS';
export const ADD_COMMENTS_FAILURE = 'ADD_COMMENTS_FAILURE';
export const ADD_COMMENTS_REQUEST = 'ADD_COMMENTS_REQUEST';


function prepareRequest() {
    return {
        type: ADD_COMMENTS_REQUEST
    }
}


function doRequest(id, content) {
    return {
        [CALL_API]: {
            endpoint: '/posts/' + id + '/comments',
            types: {
                successType: ADD_COMMENTS_SUCCESS,
                errorType: ADD_COMMENTS_FAILURE
            },
            config: {
                method: 'POST',
                body: JSON.stringify({
                    content: content
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })

            }
            ,authenticated:true
        }
    }
}

export function addComment(id, content) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(id, content));
    }
}