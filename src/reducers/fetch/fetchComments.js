import {FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_SUCCESS} from '../../actions/fetch/fetchComments';

export function fetchComments(state = {
    comments: null,
    error: null,
    isLoaded: false
}, action) {
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return Object.assign({}, state, {
                comments: action.response.map(item => {
                    return {
                        id: item.id,
                        content: item.content,
                        author: {
                            nickname: item.author.nickname,
                            avatarUrl: item.author.avatar
                        },
                        createAt: new Date(item.createdAt).toLocaleDateString('pl-PL'),
                    }
                }),
                error: null,
                isLoaded: true
            });
        case FETCH_COMMENTS_FAILURE:
            return Object.assign({}, state, {
                comments: null,
                error: action.error,
                isLoaded: true
            });
        case FETCH_COMMENTS_REQUEST:
            return Object.assign({}, state, {
                comments: null,
                error: null,
                isLoaded: false
            });
        default:
            return state
    }
}