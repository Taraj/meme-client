import React from 'react';
import {Link} from "react-router-dom";

import './MemeItem.less';


class MemeItem extends React.Component {

    like = () => {
        alert("lubie to xD" + this.props.meme.title);
    };

    dislike = () => {
        alert("nie lubie:C" + this.props.meme.title);
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
                        <span className="menu-main-main-info-tags">
                            {this.props.meme.tags.map(tag => {
                                return <Link key={tag} to={/tags/ + tag}
                                          className="menu-main-main-info-tags-item">#{tag}</Link>
                            })
                            }
                        </span>
                    </div>
                    <Link to={"/meme/" + this.props.meme.id}>
                        <img alt={this.props.meme.title} className="meme-main-image" src={this.props.meme.memeUrl}/>
                    </Link>
                    <div className="meme-main-feedback">
                        <button onClick={this.like}
                                className="meme-main-feedback-like">+{this.props.meme.likes}</button>
                        <button onClick={this.dislike}
                                className="meme-main-feedback-dislike">-{this.props.meme.dislikes}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MemeItem;