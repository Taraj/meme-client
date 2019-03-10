import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {getMainPosts} from '../actions/post';

import MemeItem from '../memeItem/MemeItem'


class Home extends React.Component {

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
                <Link to={"/home/" + (parseInt(this.pageId()) + 1)} className="main-container-long-button">
                    Następna Strona
                </Link>
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
        getPostPage: (page) => dispatch(getMainPosts(page))
    };
})(Home);
