export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return {
                hasErrored: action.hasErrored,
                message: action.message
            };
        case 'ITEMS_IS_LOADING':
            return false;
        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return true;
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return false;
        case  'ITEMS_HAS_ERRORED':
            return false;
        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
        case  'ITEMS_HAS_ERRORED':
            return [];
        default:
            return state;
    }
}