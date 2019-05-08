import {
    FETCH_USER_DETAILS_REQUEST, FETCH_USER_DETAILS_SUCCESS, FETCH_USER_DETAILS_FAILURE,
    FETCH_USER_POSTS_REQUEST, FETCH_USER_POSTS_SUCCESS, FETCH_USER_POSTS_FAILURE
} from "../../actions/fetch/fetchUserPage";

export function fetchUserPage(state = {
    posts: null,
    userDetails: null,
    error: null,
    isLoaded: false
}, action) {
    switch (action.type) {
        case FETCH_USER_POSTS_SUCCESS:
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
        case FETCH_USER_POSTS_FAILURE:
            return Object.assign({}, state, {
                posts: null,
                error: action.error,
                isLoaded: true
            });
        case FETCH_USER_POSTS_REQUEST:
            return Object.assign({}, state, {
                posts: null,
                error: null,
                isLoaded: false
            });
        case FETCH_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                userDetails: {
                    nickname: action.response.nickname,
                    avatarUrl:  action.response.avatar,
                    postsCount: action.response.postsCount,
                    commentsCount: action.response.commentsCount,
                    joinedAt: new Date(action.response.joinedAt).toLocaleDateString('pl-PL'),
                    likes: action.response.likes ,
                    dislikes: action.response.dislikes,
                },
                error: null,
                isLoaded: true
            });
        case FETCH_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                userDetails: null,
                error: action.error,
                isLoaded: true
            });
        case FETCH_USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                posts: null,
                error: null,
                isLoaded: false
            });
        default:
            return state
    }
}