import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {fetchMainPage} from "../actions/fetchMainPage";

import MemeItem from '../components/memeItem/MemeItem'


class HomePage extends React.Component {

    pageId = () => {
        if (typeof this.props.match.params.id === "undefined") {
            return 1;
        } else {
            return this.props.match.params.id;
        }
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

        if (this.props.posts === null && this.props.error === null) {
            return <p>Ładowanie...</p>;
        }

        if (this.props.posts === null) {
            return <p>Error :C</p>;
        }

        return (
            <div>
                {this.props.posts.map(item => {
                    return <MemeItem key={item.id} meme={item}/>
                })}
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
        error: state.mainPage.error
    };
}, dispatch => {
    return {
        fetchMainPage: (page) => dispatch(fetchMainPage(page))
    };
})(HomePage);
