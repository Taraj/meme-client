import React from 'react';


import MemeItem from '../memeItem/MemeItem';
import Comment from '../comment/Comment'



class MemePage extends React.Component {

    componentWillMount() {

        fetch('http://127.0.0.1:8080/api/v1/posts/+' + this.props.match.params.id)
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

        fetch('http://127.0.0.1:8080/api/v1/posts/' + this.props.match.params.id + '/comments')
            .then(response => response.json())
            .then(data => {
                let newState = {
                    meme: this.state.meme,
                    comments: data.map(item => {
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
                this.setState(newState)
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <main>
                <div className="meme-container">
                    {this.state.meme ? <MemeItem key={this.state.meme.id} meme={this.state.meme}/> : "loading.."}
                    <div className="meme-comments">
                        <header className="meme-comments-header">Komentarze</header>
                        <div className="meme-comments-container">
                            {this.state.comments ? this.state.comments.map(item => {
                                return <Comment key={item.id} comment={item}/>
                            }) : "loading.."}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default MemePage;
