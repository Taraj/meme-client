import React from 'react';
import {connect} from "react-redux";
import {fetchQueuePage} from "../../actions/fetch/fetchQueuePage";

import MemePagination from "../../components/postPage/MemePagination";


class QueuePage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
    };

    refresh = ()=>{
        this.props.fetchQueuePage(this.pageId());
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
                <MemePagination  refresh={this.refresh} posts={posts} nextPageUrl={"/queue/" + (parseInt(this.pageId()) + 1)}/>
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
        fetchQueuePage: (page) => dispatch(fetchQueuePage(page)),
    };
})(QueuePage);
