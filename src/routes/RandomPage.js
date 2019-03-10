import React from 'react';

import MemeItem from '../components/memeItem/MemeItem';
import {connect} from "react-redux";
import {getRandomPost} from "../actions/post";


class RandomPage extends React.Component {

    componentDidMount() {
        this.props.getRandomPost();
    }

    refreshMeme = () => {
        this.props.getRandomPost()
    };

    render() {
        if (this.props.fetchingError) {
            return (
                <div>
                    <p>Przepraszamy wystąpił bład w ładowaniu elementów:</p>
                    <p>{this.props.fetchingError.message}</p>
                </div>
            )
        }

        if (this.props.isFetching || this.props.post === null) {
            return <p>Ładowanie...</p>;
        }

        return (
            <div>
                <MemeItem key={this.props.post.id} meme={this.props.post}/>
                <button onClick={this.refreshMeme} className="main-container-long-button">
                    Losuj Dalej
                </button>
            </div>
        );
    }
}

export default connect(state => {
    return {
        post: state.post,
        fetchingError: state.fetchingError,
        isFetching: state.isFetching
    };
}, dispatch => {
    return {
        getRandomPost: () => dispatch(getRandomPost())
    };
})(RandomPage);
