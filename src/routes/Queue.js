import React from 'react';


import MemeItem from '../memeItem/MemeItem';

import '../Main.less';


class Queue extends React.Component {

    constructor(props) {
        super(props);
        if (typeof props.match.params.id === "undefined") {
            this.state = {
                pageId: 1,
                data: []
            };
        } else {
            this.state = {
                pageId: props.match.params.id,
                data: []
            };
        }
    }

    componentDidMount() {

        fetch('http://127.0.0.1:8080/api/v1/posts?queue=true&?offset=' + 10 * (this.state.pageId - 1))
            .then(response => response.json())
            .then(data => {
                let newState = {
                    pageId: this.state.pageId,
                    data: data.map(item => {
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
                    })
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
                    {this.state.data.map(item => {
                        return <MemeItem key={item.id.toString()} meme={item}/>
                    })}
                </div>
                <div className="meme-pagination">
                    <a href={"/queue/" + (parseInt(this.state.pageId) + 1)} className="meme-pagination-next-page">
                        Następna Strona
                    </a>
                </div>
            </main>

        );
    }
}

export default Queue;
