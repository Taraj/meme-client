const BASE_URL = 'http://localhost:8080/api/v1';


export const CALL_API = Symbol('Call API');

function callApi(endpoint, authenticated, config = {}) {

    let token = localStorage.getItem('id_token') || null;

    if (authenticated && token) {
        config.headers.push({'Authorization': `Bearer ${token}`});
    }

    return fetch(BASE_URL + endpoint, config)
        .then(response => response.json())
}


export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint, types, authenticated, config} = callAPI;

    callApi(endpoint, authenticated, config)
        .then(response => {
            next({
                response: response,
                type: types.successType
            })
        })
        .catch(err => {
            next({
                error: err,
                type: types.errorType
            })
        })
}