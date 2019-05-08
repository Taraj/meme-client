export function AddFeedbackToPost(id, isLike) {
    return new Promise((resolve, reject) => {
        fetch('https://taraj.tk/api/v1/posts/' + id + "/feedback", {
            method: 'POST',
            body: JSON.stringify({
                like: isLike
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            res.text()
                .then(text =>
                    text ? JSON.parse(text) : {}
                )
                .then(json => {
                    if (res.status > 400)
                        reject(json);

                    resolve(json);
                });
        })
    });
}