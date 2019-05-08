import {ADD_POST_FAILURE,ADD_POST_REQUEST,ADD_POST_SUCCESS} from "../../actions/add/addPost";

export function addPost(state = {
    error: null,
    isAdded: false
}, action) {
    switch (action.type) {
        case ADD_POST_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isAdded: true
            });
        case ADD_POST_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isAdded: true
            });
        case ADD_POST_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isAdded: false
            });
        default:
            return state
    }
}