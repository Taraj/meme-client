import React from 'react';
import {Link} from "react-router-dom";

import './MemeItem.less';
import {AddFeedbackToPost} from "../../api/AddFeedbackToPost";
import {callApi} from "../../middleware/api";

export class MemeItemAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.meme.likes,
            dislikes: this.props.meme.dislikes
        }
    }

    like = () => {

        AddFeedbackToPost(this.props.meme.id, true)
            .then(() => {
                this.setState({
                    likes: this.state.likes + 1
                })
            })
            .catch(err => {
                console.log(err);
            })
    };

    dislike = () => {
        AddFeedbackToPost(this.props.meme.id, false)
            .then(() => {
                this.setState({
                    dislikes: this.state.dislikes + 1
                })
            })
            .catch(err => {
                console.log(err);
            })
    };
    add = () => {
        callApi('/posts/' + this.props.meme.id, true, {
            method: 'PUT',
            headers: new Headers()
        }).then(()=>{
            this.props.refresh();
        })

    };

    delete = () => {
        callApi('/posts/' + this.props.meme.id, true, {
            method: 'DELETE',
            headers: new Headers()
        }).then(()=>{
            this.props.refresh();
        })
    };

    render() {

        const {
            id,
            author,
            createAt,
            tags,
            title,
            memeUrl
        } = this.props.meme;

        return (
            <div className="meme-item-container">
                <Link to={"/meme/" + id} className="meme-item-title">
                    {title}
                </Link>
                <div className="meme-item-main-frame">
                    <div className="menu-main-main-info">
                        <Link to={"/user/" + author.nickname + "/1"} className="menu-main-main-info-author">
                            {author.nickname}
                        </Link>
                        <span className="menu-main-main-info-date">
                            {createAt}
                        </span>
                        <span>
                            {tags.map(tag => {
                                return <Link key={tag} to={"/tags/" + tag + "/1"}
                                             className="menu-main-main-info-tags-item">
                                    #{tag}
                                </Link>
                            })}
                        </span>
                    </div>
                    <Link to={"/meme/" + id}>
                        <img alt={title} className="meme-main-image" src={memeUrl}/>
                    </Link>
                    <div className="meme-main-buttons">
                        <button onClick={this.like} className="meme-main-button meme-main-feedback-like">
                            +{this.state.likes}
                        </button>
                        <button onClick={this.dislike} className="meme-main-button meme-main-feedback-dislike">
                            {-1 * this.state.dislikes}
                        </button>
                    </div>
                    <div className="meme-main-buttons">
                        <button onClick={this.add} className="meme-main-button meme-main-add">
                            Dodaj
                        </button>
                        <button onClick={this.delete} className="meme-main-button meme-main-delete">
                            Usuń
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}