import {combineReducers} from "redux";

import { items, itemsHasErrored, itemsIsLoading } from './post';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading
});