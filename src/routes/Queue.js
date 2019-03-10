import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {getQueuePosts} from '../actions/post';

import MemeItem from '../components/memeItem/MemeItem'


class Queue extends React.Component {

    pageId = () => {
        if (typeof this.props.match.params.id === "undefined") {
            return 1;
        } else {
            return this.props.match.params.id;
        }
    };

    componentDidMount() {
        this.props.getPostPage(this.pageId());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getPostPage(this.pageId());
        }
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

        if (this.props.isFetching) {
            return <p>Ładowanie...</p>;
        }


        return (
            <div>
                {this.props.posts.map(item => {
                    return <MemeItem key={item.id} meme={item}/>
                })}
                <Link to={"/queue/" + (parseInt(this.pageId()) + 1)} className="main-container-long-button">
                    Następna Strona
                </Link>
            </div>
        );
    }
}

export default connect(state => {
    return {
        posts: state.posts,
        fetchingError: state.fetchingError,
        isFetching: state.isFetching
    };
}, dispatch => {
    return {
        getPostPage: (page) => dispatch(getQueuePosts(page))
    };
})(Queue);
