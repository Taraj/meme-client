import React from 'react';

import MemeItem from '../memeItem/MemeItem';
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
        if (this.props.hasErrored) {
            return (
                <div>
                    <p>Przepraszamy wystąpił bład w ładowaniu elementów:</p>
                    <p>{this.props.hasErrored.message}</p>
                </div>
            )
        }

        if (this.props.isLoading) {
            return <p>Ładowanie...</p>;
        }

        return (
            <div>
                {this.props.items.map(item => {
                    return <MemeItem key={item.id} meme={item}/>
                })}
                <button onClick={this.refreshMeme} className="main-container-long-button">
                    Losuj Dalej
                </button>
            </div>
        );
    }
}

export default connect(state => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
}, dispatch => {
    return {
        getRandomPost: () => dispatch(getRandomPost())
    };
})(RandomPage);
