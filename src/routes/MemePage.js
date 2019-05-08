import React from 'react';
import {connect} from "react-redux";


import {MemeItem} from '../components/memeItem/MemeItem';
import Comment from '../components/comment/Comment'

import {fetchComments} from "../actions/fetch/fetchComments";
import {fetchPost} from "../actions/fetch/fetchPost";
import {addComment} from "../actions/add/addComment";



class MemePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }


    componentWillMount() {
        this.props.fetchComments(this.props.match.params.id);
        this.props.fetchPost(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isAdded === true && prevProps.isAdded === false){
            this.props.fetchComments(this.props.match.params.id);
        }
    }


    inputEvent = e => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        })
    };

    addComment = e => {
        e.preventDefault();
        this.setState({
            comment: ""
        });
        this.props.addComment(this.props.match.params.id, this.state.comment.trim());
    };

    render() {
        const {
            post,
            PostIsLoaded,
            comments,
            CommentIsLoaded,
            isAuthenticated
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
                            <Comment key={item.id} comment={item}/>
                        )}
                    </div>
                </div>
                {isAuthenticated ? (
                    <form onSubmit={this.addComment} className="comment-input-container">
                        <header> Dodaj kometarz</header>
                        <textarea className={"comment-input"} value={this.state.comment} onChange={this.inputEvent}
                                  name={"comment"} maxLength={255}/>
                        <input type={"submit"} value={"Dodaj"} className={"comment-submit"}/>
                    </form>
                ) : null}
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
        CommentIsLoaded: state.comments.isLoaded,

        isAuthenticated: state.auth.isAuthenticated,

        isAdded: state.addComment.isAdded,

        isAdmin: state.auth.data.admin
    };
}, dispatch => {
    return {
        fetchComments: id => dispatch(fetchComments(id)),
        fetchPost: id => dispatch(fetchPost(id)),
        addComment: (id, comment) => dispatch(addComment(id, comment))
    };
})(MemePage);

