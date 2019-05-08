import {combineReducers} from 'redux';

import {fetchRandomPost} from './fetch/fetchRandomPost';
import {fetchQueuePage} from './fetch/fetchQueuePage';
import {fetchMainPage} from './fetch/fetchMainPage';
import {fetchComments} from './fetch/fetchComments';
import {fetchPost} from './fetch/fetchPost';
import {auth} from './auth'
import {addComment} from './add/addComment';
import {addFeedback} from './add/addFeedback';
import {fetchTagPage} from "./fetch/fetchTagPage";
import {fetchUserPage} from "./fetch/fetchUserPage";
import {addPost} from "./add/addPost";

const rootReducer = combineReducers({
    randomPost: fetchRandomPost,
    mainPage: fetchMainPage,
    queuePage: fetchQueuePage,
    comments: fetchComments,
    post: fetchPost,
    auth: auth,
    addComment: addComment,
    fetchTagPage: fetchTagPage,
    userPage:fetchUserPage,
    addPost:addPost
});

export default rootReducer