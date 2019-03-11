import {FETCH_QUEUE_PAGE_REQUEST, FETCH_QUEUE_PAGE_FAILURE, FETCH_QUEUE_PAGE_SUCCESS} from '../actions/fetchQueuePage';

export function queuePage(state = {
    posts: null,
    error: null
}, action) {
    switch (action.type) {
        case FETCH_QUEUE_PAGE_SUCCESS:
            return Object.assign({}, state, {
                posts: action.response.map(item => {
                    return {
                        id: item.id,
                        author: {
                            nickname: item.author.nickname,
                        },
                        memeUrl: item.url,
                        title: item.title,
                        createAt: new Date(item.createdAt).toLocaleDateString('pl-PL'),
                        tags: item.tags.map(tag => {
                            return tag.name
                        }),
                        likes: item.likes,
                        dislikes: item.dislikes
                    }
                }),
                error: null
            });
        case FETCH_QUEUE_PAGE_FAILURE:
            return Object.assign({}, state, {
                posts: null,
                error: action.error
            });
        case FETCH_QUEUE_PAGE_REQUEST:
            return Object.assign({}, state, {
                posts: null,
                error: null
            });

        default:
            return state
    }
}