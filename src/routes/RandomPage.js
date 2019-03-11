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

        if (this.props.post === null && this.props.error === null) {
            return <p>Ładowanie...</p>;
        }

        if (this.props.post === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                <MemeItem meme={this.props.post}/>
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
        error: state.randomPost.error
    };
}, dispatch => {
    return {
        fetchRandomPost: () => dispatch(fetchRandomPost())
    };
})(RandomPage);
