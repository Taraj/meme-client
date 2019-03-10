function fetchingError(bool, message) {
    return {
        type: 'FETCHING_ERROR',
        fetchingError: bool,
        message: message
    };
}

function isFetching(bool) {
    return {
        type: 'IS_FETCHING',
        isFetching: bool
    };
}

function fetchPostListSuccess(posts) {
    return {
        type: 'FETCH_POST_LIST_SUCCESS',
        posts
    };
}

function fetchPostSuccess(post) {
    return {
        type: 'FETCH_POST_SUCCESS',
        post
    };
}

function fetchPostWithCommentsSuccess(postWithComments) {
    return {
        type: 'FETCH_POST_WITH_COMMENTS_SUCCESS',
        postWithComments
    };
}

export function getMainPosts(page) {
    return (dispatch) => {
        dispatch(isFetching(true));
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
                dispatch(fetchPostListSuccess(items))
            })
            .catch(err => dispatch(fetchingError(true, err.message)))
    }
}

export function getQueuePosts(page) {
    return (dispatch) => {
        dispatch(isFetching(true));
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
                dispatch(fetchPostListSuccess(items))
            })
            .catch(err => dispatch(fetchingError(true, err.message)))
    }
}

export function getRandomPost() {
    return (dispatch) => {
        dispatch(isFetching(true));
        fetch('http://127.0.0.1:8080/api/v1/posts/random')
            .then(response => response.json())
            .then(item => {
                const post = {

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

                };
                dispatch(fetchPostSuccess(post))
            })
            .catch(err => dispatch(fetchingError(true, err.message)))
    }
}

export function getPostWithComments(id) {

    return (dispatch) => {
        dispatch(isFetching(true));

        Promise.all([
            'http://127.0.0.1:8080/api/v1/posts/+' + id,
            'http://127.0.0.1:8080/api/v1/posts/' + id + '/comments'
        ].map(url =>
            fetch(url)
                .then(response => response.json())
        )).then(data => {
            console.log(data[0]);
            const postWithComments = {
                post: {
                    id: data[0].id,
                    author: {
                        nickname: data[0].author.nickname,
                    },
                    memeUrl: data[0].url,
                    title: data[0].title,
                    createAt: new Date(data[0].createdAt).toLocaleDateString('pl-PL'),
                    tags: data[0].tags.map(tag => {
                        return tag.name
                    }),
                    likes: 123,
                    dislikes: 12
                },
                comments: data[1].map(item => {
                    return {
                        id: item.id,
                        content: item.content,
                        author: {
                            nickname: item.author.nickname,
                            avatarUrl: item.author.avatar
                        },
                        createAt: new Date(item.createdAt).toLocaleDateString('pl-PL'),
                    }
                })
            };

            dispatch(fetchPostWithCommentsSuccess(postWithComments))
        }).catch(err => dispatch(fetchingError(true, err.message)))

    }
}