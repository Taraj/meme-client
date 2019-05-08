import React from 'react';
import {connect} from "react-redux";
import {fetchTagPage} from "../../actions/fetch/fetchTagPage";

import MemePagination from "../../components/postPage/MemePagination";


class TagPage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
    };

    tagName = () => {
        return this.props.match.params.name;
    };

    refresh = ()=>{
        this.props.fetchTagPage(this.tagName(), this.pageId());
    };


    componentDidMount() {
        this.props.fetchTagPage(this.tagName(), this.pageId());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id ||
            prevProps.match.params.name !== this.props.match.params.name
        ) {
            this.props.fetchTagPage(this.tagName(), this.pageId());
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
                <MemePagination posts={posts}  refresh={this.refresh}
                                nextPageUrl={"/tags/" + this.tagName() + "/" + (parseInt(this.pageId()) + 1)}/>
            </div>
        );
    }
}

export default connect(state => {
    return {
        posts: state.fetchTagPage.posts,
        error: state.fetchTagPage.error,
        isLoaded: state.fetchTagPage.isLoaded,
    };
}, dispatch => {
    return {
        fetchTagPage: (tag, page) => dispatch(fetchTagPage(tag, page)),
    };
})(TagPage);