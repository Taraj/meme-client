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
        const {
            post,
            PostIsLoaded,
            comments,
            CommentIsLoaded
        } = this.props;

        if (!PostIsLoaded || !CommentIsLoaded) {
            return <p>Ładowanie...</p>;
        }

        if (post === null || comments === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                <MemeItem meme={post}/>
                <div className="meme-comments">
                    <header className="meme-comments-header">Komentarze</header>
                    <div className="meme-comments-container">
                        {comments.map(item =>
                            <Comment comment={item}/>
                        )}
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
        PostIsLoaded: state.post.isLoaded,

        comments: state.comments.comments,
        errorComment: state.comments.comments,
        CommentIsLoaded: state.comments.isLoaded
    };
}, dispatch => {
    return {
        fetchComments: id => dispatch(fetchComments(id)),
        fetchPost: id => dispatch(fetchPost(id))
    };
})(MemePage);

