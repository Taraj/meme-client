import React from 'react';


import MemeItem from '../memeItem/MemeItem';

import '../Main.less';


class RandomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meme: null,
            comments: null
        }
    }

    componentWillMount() {

        fetch('http://127.0.0.1:8080/api/v1/posts/random')
            .then(response => response.json())
            .then(data => {
                let newState = {
                    meme: {
                        id: data.id,
                        author: {
                            nickname: data.author.nickname,
                        },
                        memeUrl: data.url,
                        title: data.title,
                        createAt: new Date(data.createdAt).toLocaleDateString('pl-PL'),
                        tags: data.tags.map(tag => {
                            return tag.name
                        }),
                        likes: 123,
                        dislikes: 12
                    },
                    comments: this.state.comments
                };
                this.setState(newState);
            }).catch(err => {
            console.log(err);
        });

    }

    render() {
        return (
            <main>
                <div className="meme-container">
                    {this.state.meme ? <MemeItem key={this.state.meme.id} meme={this.state.meme}/> : "loading.."}
                </div>
                <div className="meme-pagination">
                    <a href={"/random"} className="meme-pagination-next-page">
                        Losuj dalej
                    </a>
                </div>
            </main>
        );
    }
}

export default RandomPage;
