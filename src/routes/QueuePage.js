import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {fetchQueuePage} from "../actions/fetchQueuePage";

import MemeItem from '../components/memeItem/MemeItem'


class QueuePage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
    };

    componentDidMount() {
        this.props.fetchQueuePage(this.pageId());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchQueuePage(this.pageId());
        }
    }

    render() {
        const {posts, isLoaded} = this.props;

        if (!isLoaded) {
            return <p>Ładowanie...</p>;
        }

        if (posts === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                {posts.map(item =>
                    <MemeItem key={item.id} meme={item}/>
                )}
                <Link to={"/queue/" + (parseInt(this.pageId()) + 1)} className="main-container-long-button">
                    Następna Strona
                </Link>
            </div>
        );
    }
}

export default connect(state => {
    return {
        posts: state.queuePage.posts,
        error: state.queuePage.error,
        isLoaded: state.queuePage.isLoaded,
    };
}, dispatch => {
    return {
        fetchQueuePage: (page) => dispatch(fetchQueuePage(page))
    };
})(QueuePage);
