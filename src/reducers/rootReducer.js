import {combineReducers} from 'redux';

import {randomPost} from './randomPost';
import {queuePage} from './queuePage';
import {mainPage} from './mainPage';
import {comments} from './comments';
import {post} from './post';
import {auth} from './auth'
import {addComment} from './addComment';

const rootReducer = combineReducers({
    randomPost: randomPost,
    mainPage: mainPage,
    queuePage: queuePage,
    comments: comments,
    post: post,
    auth: auth,
    addComment: addComment
});

export default rootReducer