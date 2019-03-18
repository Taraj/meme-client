import {combineReducers} from 'redux';

import {fetchRandomPost} from './fetch/fetchRandomPost';
import {fetchQueuePage} from './fetch/fetchQueuePage';
import {fetchMainPage} from './fetch/fetchMainPage';
import {fetchComments} from './fetch/fetchComments';
import {fetchPost} from './fetch/fetchPost';
import {auth} from './auth'
import {addComment} from './add/addComment';
import {addFeedback} from './add/addFeedback';

const rootReducer = combineReducers({
    randomPost: fetchRandomPost,
    mainPage: fetchMainPage,
    queuePage: fetchQueuePage,
    comments: fetchComments,
    post: fetchPost,
    auth: auth,
    addComment: addComment,
    addFeedback: addFeedback
});

export default rootReducer