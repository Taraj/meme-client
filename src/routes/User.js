import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {getMainPosts} from '../actions/post';

import MemeItem from '../components/memeItem/MemeItem'


class User extends React.Component {


    componentDidMount() {

    }


    render() {

        /*
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
        }*/
        return (
            <div>
                <div className="user-main">
                    <div className="user-main-avatar">
                        <img className="user-main-avatar-img" alt="qwe" src="https://i1.jbzdy.pl/users/default.jpg"/>
                    </div>
                    <div className="user-main-info">
                        <header className="user-main-info-nickname">
                            Taraj
                        </header>
                        <div>
                            Liczba wpisów:4
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(state => {
    return {
        // user: state.user,
        fetchingError: state.fetchingError,
        isFetching: state.isFetching
    };
}, dispatch => {
    return {
        getPostPage: (page) => dispatch(getMainPosts(page))
    };
})(User);
