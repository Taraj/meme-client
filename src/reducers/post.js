export function fetchingError(state = false, action) {
    switch (action.type) {
        case 'FETCHING_ERROR':
            return {
                fetchingError: action.fetchingError,
                message: action.message
            };
        case 'IS_FETCHING':
            return false;
        default:
            return state;
    }
}

export function isFetching(state = false, action) {
    switch (action.type) {
        case 'IS_FETCHING':
            return true;
        case 'FETCH_POST_LIST_SUCCESS':
            return false;
        case  'FETCHING_ERROR':
            return false;
        case 'FETCH_POST_SUCCESS':
            return false;
        case 'FETCH_POST_WITH_COMMENTS_SUCCESS':
            return false;
        default:
            return state;
    }
}

export function posts(state = [], action) {
    switch (action.type) {
        case 'FETCH_POST_LIST_SUCCESS':
            return action.posts;
        case  'FETCHING_ERROR':
            return [];
        default:
            return state;
    }
}


export function post(state = null, action) {
    switch (action.type) {
        case 'FETCH_POST_SUCCESS':
            return action.post;
        case  'FETCHING_ERROR':
            return null;
        default:
            return state;
    }
}

export function postWithComments(state = null, action) {
    switch (action.type) {
        case 'FETCH_POST_WITH_COMMENTS_SUCCESS':
            return action.postWithComments;
        case  'FETCHING_ERROR':
            return null;
        default:
            return state;
    }
}