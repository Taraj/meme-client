import React from 'react';
import {connect} from "react-redux";


import MemeItem from '../components/memeItem/MemeItem';
import Comment from '../components/comment/Comment'

import {fetchComments} from "../actions/fetchComments";
import {fetchPost} from "../actions/fetchPost";

class MemePage extends React.Component {

    componentWillMount() {
        this.props.getPostWithComments(this.props.match.params.id);
    }

    render() {
        if (this.props.fetchingError) {
            return (
                <div>
                    <p>Przepraszamy wystąpił bład w ładowaniu elementów:</p>
                    <p>{this.props.fetchingError.message}</p>
                </div>
            )
        }

        if (this.props.isFetching || this.props.postWithComments === null) {
            return <p>Ładowanie...</p>;
        }

        return (
            <div>
                <MemeItem key={this.props.postWithComments.randomPost.id}
                          meme={this.props.postWithComments.randomPost}/>
                <div className="meme-comments">
                    <header className="meme-comments-header">Komentarze</header>
                    <div className="meme-comments-container">
                        {this.props.postWithComments.comments.map(item => {
                            return <Comment key={item.id} comment={item}/>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(state => {
    return {
        post: state.randomPost.posts,
        errorPost: state.randomPost.error,
        comments: state.comments.comments,
        errorComment: state.comments.comments

    };
}, dispatch => {
    return {
        fetchComments: id => dispatch(fetchComments(id)),
        fetchPost: id => dispatch(fetchPost(id))
    };
})(MemePage);

