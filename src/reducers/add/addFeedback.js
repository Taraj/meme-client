import{ADD_FEEDBACK_FAILURE, ADD_FEEDBACK_REQUEST, ADD_FEEDBACK_SUCCESS} from "../../actions/add/addFeedback";

export function addFeedback(state = {
    error: null,
    isAdded: false
}, action) {
    switch (action.type) {
        case ADD_FEEDBACK_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                isAdded: true
            });
        case ADD_FEEDBACK_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isAdded: true
            });
        case ADD_FEEDBACK_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isAdded: false
            });
        default:
            return state
    }
}