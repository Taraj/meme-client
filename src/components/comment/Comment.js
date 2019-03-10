import React from 'react';

import './Comment.less';
import {Link} from "react-router-dom";

class Comment extends React.Component {

    render() {
        return (
            <div className="comment-item-container">
                <div className="comment-item-author-image">
                    <Link to={"/user/" + this.props.comment.author.nickname}
                          className="comment-item-author-image-link">
                        <img className="comment-item-author-image-avatar"
                             alt={this.props.comment.author.nickname}
                             src={this.props.comment.author.avatarUrl}/>
                    </Link>
                </div>

                <div className="comment-item-main">
                    <div className="comment-item-main-info">
                        <Link to={"/user/" + this.props.comment.author.nickname}
                              className="comment-item-main-info-author">{this.props.comment.author.nickname}</Link>
                        <span className="menu-main-main-info-date">{this.props.comment.createAt}</span>
                    </div>
                    <div className="comment-item-content">
                        {this.props.comment.content}
                    </div>
                </div>

            </div>
        );
    }
}

export default Comment;