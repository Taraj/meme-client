import {CALL_API} from '../../middleware/api';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';


function prepareRequest() {
    return {
        type: ADD_POST_REQUEST
    }
}


function doRequest(content) {
    return {
        [CALL_API]: {
            endpoint: '/posts/',
            types: {
                successType: ADD_POST_SUCCESS,
                errorType: ADD_POST_FAILURE
            },
            config: {
                method: 'POST',
                body: JSON.stringify(
                   content
                ),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })

            },
            authenticated:true
        }
    }
}

export function addPost( content) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest( content));
    }
}