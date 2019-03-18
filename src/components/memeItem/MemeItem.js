import React from 'react';
import {Link} from "react-router-dom";

import './MemeItem.less';
import {connect} from "react-redux";
import {addFeedback} from "../../actions/add/addFeedback";

import {fetchQueuePage} from "../../actions/fetch/fetchQueuePage";

class MemeItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.meme.likes,
            dislikes: this.props.meme.dislikes
        }
    }


    like = () => {
        addFeedback(this.props.meme.id,true);
    };

    dislike = () => {
        addFeedback(this.props.meme.id,false);
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


export default connect(state => {
    return {
        addFeedback: state.addFeedback.error,
        isAdded: state.addFeedback.isAdded
    };
}, dispatch => {
    return {
        addFeedback: (id, isLike) => dispatch(fetchQueuePage(id))
    };
})(MemeItem);