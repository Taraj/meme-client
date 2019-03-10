import React from 'react';
import {connect} from "react-redux";
import {getPostWithComments} from '../actions/post';

import MemeItem from '../components/memeItem/MemeItem';
import Comment from '../components/comment/Comment'


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
                <MemeItem key={this.props.postWithComments.post.id} meme={this.props.postWithComments.post}/>
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
        postWithComments: state.postWithComments,
        fetchingError: state.fetchingError,
        isFetching: state.isFetching
    };
}, dispatch => {
    return {
        getPostWithComments: (id) => dispatch(getPostWithComments(id))
    };
})(MemePage);

