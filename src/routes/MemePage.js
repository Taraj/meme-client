import React from 'react';
import {connect} from "react-redux";


import MemeItem from '../components/memeItem/MemeItem';
import Comment from '../components/comment/Comment'

import {fetchComments} from "../actions/fetchComments";
import {fetchPost} from "../actions/fetchPost";

class MemePage extends React.Component {

    componentWillMount() {
        this.props.fetchComments(this.props.match.params.id);
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {

        if (this.props.post === null && this.props.errorPost === null) {
            return <p>Ładowanie...</p>;
        }

        if (this.props.post === null) {
            return <p>Error :C</p>;
        }

        if (this.props.comments === null && this.props.errorComment === null) {
            return <p>Ładowanie...</p>;
        }

        if (this.props.errorComment === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                <MemeItem meme={this.props.post}/>
                <div className="meme-comments">
                    <header className="meme-comments-header">Komentarze</header>
                    <div className="meme-comments-container">
                        {this.props.comments.map(item => {
                            return <Comment comment={item}/>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(state => {
    return {
        post: state.post.post,
        errorPost: state.post.error,
        comments: state.comments.comments,
        errorComment: state.comments.comments
    };
}, dispatch => {
    return {
        fetchComments: id => dispatch(fetchComments(id)),
        fetchPost: id => dispatch(fetchPost(id))
    };
})(MemePage);

