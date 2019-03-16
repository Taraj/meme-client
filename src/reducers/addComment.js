import {ADD_COMMENTS_FAILURE,ADD_COMMENTS_REQUEST,ADD_COMMENTS_SUCCESS} from '../actions/addComment';

export function addComment(state = {
    error: null,
    isAdded: false
}, action) {
    switch (action.type) {
        case ADD_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isAdded: true
            });
        case ADD_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isAdded: true
            });
        case ADD_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isAdded: false
            });
        default:
            return state
    }
}