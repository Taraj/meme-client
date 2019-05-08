import {FETCH_TAG_PAGE_FAILURE, FETCH_TAG_PAGE_REQUEST, FETCH_TAG_PAGE_SUCCESS} from "../../actions/fetch/fetchTagPage";

export function fetchTagPage(state = {
    posts: null,
    error: null,
    isLoaded: false
}, action) {
    switch (action.type) {
        case FETCH_TAG_PAGE_SUCCESS:
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
                error: null,
                isLoaded: true
            });
        case FETCH_TAG_PAGE_FAILURE:
            return Object.assign({}, state, {
                posts: null,
                error: action.error,
                isLoaded: true
            });
        case FETCH_TAG_PAGE_REQUEST:
            return Object.assign({}, state, {
                posts: null,
                error: null,
                isLoaded: false
            });

        default:
            return state
    }
}