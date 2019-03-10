import {combineReducers} from "redux";

import {posts, fetchingError, isFetching, post, postWithComments} from './post';

export default combineReducers({
    posts: posts,
    post: post,
    postWithComments: postWithComments,
    fetchingError: fetchingError,
    isFetching: isFetching
});