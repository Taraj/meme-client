import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {fetchMainPage} from "../actions/fetchMainPage";

import MemeItem from '../components/memeItem/MemeItem'

class HomePage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
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
                {posts.map(item =>
                    <MemeItem key={item.id} meme={item}/>
                )}
                <Link to={"/home/" + (parseInt(this.pageId()) + 1)} className="main-container-long-button">
                    Następna Strona
                </Link>
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
