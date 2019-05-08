import React from 'react';
import {connect} from "react-redux";
import {fetchMainPage} from "../../actions/fetch/fetchMainPage";

import MemePagination from "../../components/postPage/MemePagination";


class HomePage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
    };

    refresh = ()=>{
        this.props.fetchMainPage(this.pageId());
    };

    componentDidMount() {
        this.props.fetchMainPage(this.pageId());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchMainPage(this.pageId());
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
                <MemePagination refresh={this.refresh} posts={posts} nextPageUrl={"/home/" + (parseInt(this.pageId()) + 1)}/>
            </div>
        );
    }
}

export default connect(state => {
    return {
        posts: state.mainPage.posts,
        error: state.mainPage.error,
        isLoaded: state.mainPage.isLoaded,
    };
}, dispatch => {
    return {
        fetchMainPage: (page) => dispatch(fetchMainPage(page))
    };
})(HomePage);
