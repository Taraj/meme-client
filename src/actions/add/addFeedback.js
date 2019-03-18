import {CALL_API} from '../../middleware/api';

export const ADD_FEEDBACK_SUCCESS = 'ADD_FEEDBACK_SUCCESS';
export const ADD_FEEDBACK_FAILURE = 'ADD_FEEDBACK_FAILURE';
export const ADD_FEEDBACK_REQUEST = 'ADD_FEEDBACK_REQUEST';


function prepareRequest() {
    return {
        type: ADD_FEEDBACK_REQUEST
    }
}


function doRequest(id, isPositive) {

    return {
        [CALL_API]: {
            endpoint: '/posts/' + id + '/feedback',
            types: {
                successType: ADD_FEEDBACK_SUCCESS,
                errorType: ADD_FEEDBACK_FAILURE
            },
            config: {
                method: 'POST',
                body: JSON.stringify({
                    like: isPositive
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })

            }
        }
    }
}

export function addFeedback(id, isPositive) {
    return dispatch => {
        dispatch(prepareRequest());
        dispatch(doRequest(id, isPositive));
    }
}