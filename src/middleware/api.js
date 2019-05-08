const BASE_URL = 'https://taraj.tk/api/v1';


export const CALL_API = Symbol('Call API');

export function callApi(endpoint, authenticated, config = {
    headers: new Headers()
}) {

    if (authenticated) {
        const auth = localStorage.getItem('auth');
        if (auth) {
            const {token} = JSON.parse(auth);
            config.headers.append('Authorization', `Bearer ${token}`);
        }
    }
    return new Promise((resolve, reject) => {
        return fetch(BASE_URL + endpoint, config)
            .then(response => {
                if (!response.headers.get("Content-Type")) {
                    if (response.status >= 400) {
                        reject({});
                    }
                    resolve({})
                }
                response.json().then(json => {
                    if (response.status >= 400) {
                        reject(json);
                    }
                    resolve(json)
                }).catch(err => reject(err))
            }).catch(err => reject(err))
    });
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