import React from 'react';

import './Comment.less';


class Comment extends React.Component {

    like = () => {
        alert("lubie to xD");
    };

    dislike = () => {
        alert("nie lubie:C");
    };

    render() {
        return (
            <div className="comment-item-container">
                <div className="comment-item-author-image">
                    <a href={/users/+ this.props.comment.author.nickname}
                    className="comment-item-author-image-link"
                    >

                    <img className="comment-item-author-image-avatar"
                         alt={this.props.comment.author.nickname}
                         src={this.props.comment.author.avatarUrl}
                    />
                    </a>
                </div>

                <div className="comment-item-main">
                    <div className="comment-item-main-info">
                        <a href={/users/+ this.props.comment.author.nickname}
                           className="comment-item-main-info-author">{this.props.comment.author.nickname}</a>
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