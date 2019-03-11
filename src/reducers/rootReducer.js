import {combineReducers} from 'redux';

import {randomPost} from './randomPost';
import {queuePage} from './queuePage';
import {mainPage} from './mainPage';
import {comments} from './comments';
import {post} from './post';

const rootReducer = combineReducers({
    randomPost: randomPost,
    mainPage: mainPage,
    queuePage: queuePage,
    comments: comments,
    post: post
});

export default rootReducer