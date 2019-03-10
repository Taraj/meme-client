export function itemsHasErrored(bool, message) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool,
        message: message
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}


export function getMainPosts(page) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch('http://127.0.0.1:8080/api/v1/posts?offset=' + 10 * (page - 1))
            .then(response => response.json())
            .then(data => {
                const items = data.map(item => {
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
                        likes: 123,
                        dislikes: 12
                    }
                });
                dispatch(itemsFetchDataSuccess(items))
            })
            .catch(err => dispatch(itemsHasErrored(true, err.message)))
    }
}

export function getQueuePosts(page) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch('http://127.0.0.1:8080/api/v1/posts?queue=true&offset=' + 10 * (page - 1))
            .then(response => response.json())
            .then(data => {
                const items = data.map(item => {
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
                        likes: 123,
                        dislikes: 12
                    }
                });
                dispatch(itemsFetchDataSuccess(items))
            })
            .catch(err => dispatch(itemsHasErrored(true, err.message)))
    }
}

export function getRandomPost() {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch('http://127.0.0.1:8080/api/v1/posts/random')
            .then(response => response.json())
            .then(item => {
                const items = [{

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
                        likes: 123,
                        dislikes: 12

                }];
                dispatch(itemsFetchDataSuccess(items))
            })
            .catch(err => dispatch(itemsHasErrored(true, err.message)))
    }
}