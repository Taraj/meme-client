import React from 'react';

import MemeItem from '../components/memeItem/MemeItem';
import {connect} from "react-redux";
import {fetchRandomPost} from '../actions/fetchRandomPost';


class RandomPage extends React.Component {

    componentDidMount() {
        this.props.fetchRandomPost();
    }

    refreshMeme = () => {
        this.props.fetchRandomPost()
    };

    render() {
        const {post, isLoaded} = this.props;

        if (!isLoaded) {
            return <p>Ładowanie...</p>;
        }

        if (post === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                <MemeItem meme={post}/>
                <button onClick={this.refreshMeme} className="main-container-long-button">
                    Losuj Dalej
                </button>
            </div>
        );
    }
}

export default connect(state => {
    return {
        post: state.randomPost.post,
        error: state.randomPost.error,
        isLoaded: state.randomPost.isLoaded,
    };
}, dispatch => {
    return {
        fetchRandomPost: () => dispatch(fetchRandomPost())
    };
})(RandomPage);
