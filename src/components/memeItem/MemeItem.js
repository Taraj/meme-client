import React from 'react';
import {Link} from "react-router-dom";

import './MemeItem.less';


class MemeItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.meme.likes,
            dislikes: this.props.meme.dislikes
        }
    }


    like = () => {
        this.setState({
            likes: this.state.likes + 1,
            dislikes: this.state.dislikes
        })
    };

    dislike = () => {
        this.setState({
            likes: this.state.likes,
            dislikes: this.state.dislikes + 1
        })
    };

    render() {
        return (
            <div className="meme-item-container">
                <Link to={"/meme/" + this.props.meme.id} className="meme-item-title">
                    {this.props.meme.title}
                </Link>
                <div className="meme-item-main-frame">
                    <div className="menu-main-main-info">
                        <Link to={"/user/" + this.props.meme.author.nickname} className="menu-main-main-info-author">
                            {this.props.meme.author.nickname}
                        </Link>
                        <span className="menu-main-main-info-date">
                            {this.props.meme.createAt}
                        </span>
                        <span>
                            {this.props.meme.tags.map(tag => {
                                return <Link key={tag} to={"/tags/" + tag}
                                             className="menu-main-main-info-tags-item">#{tag}</Link>
                            })}
                        </span>
                    </div>
                    <Link to={"/meme/" + this.props.meme.id}>
                        <img alt={this.props.meme.title} className="meme-main-image" src={this.props.meme.memeUrl}/>
                    </Link>
                    <div className="meme-main-feedback">
                        <button onClick={this.like}
                                className="meme-main-feedback-like">+{this.state.likes}</button>
                        <button onClick={this.dislike}
                                className="meme-main-feedback-dislike">{-1*this.state.dislikes}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MemeItem;