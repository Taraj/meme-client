import React from 'react';
import MemePagination from "../../components/postPage/MemePagination";
import {connect} from "react-redux";
import {fetchUserDetails} from "../../actions/fetch/fetchUserPage";
import {fetchUserPosts} from "../../actions/fetch/fetchUserPage";
import {callApi} from "../../middleware/api";

class UserPage extends React.Component {

    pageId = () => {
        const {id} = this.props.match.params;
        return (id ? id : 1);
    };

    refresh = () => {
        this.props.fetchUserPosts(this.nickname(), this.pageId());
    };


    nickname = () => {
        return this.props.match.params.nickname;
    };


    componentDidMount() {
        this.props.fetchUserDetails(this.nickname());
        this.props.fetchUserPosts(this.nickname(), this.pageId());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.match.params.nickname !== this.props.match.params.nickname) {
            this.props.fetchUserDetails(this.nickname());
            this.props.fetchUserPosts(this.nickname(), this.pageId());
            return;
        }

        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchUserPosts(this.nickname(), this.pageId());
        }
    }


    like = () => {
        callApi('/users/' + this.nickname() + '/feedback', true, {
            method: 'POST',
            headers:new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                like: true
            }),
        }).then(() => {
            this.props.fetchUserDetails(this.nickname());
        })
    };

    dislike = () => {
        callApi('/users/' + this.nickname() + '/feedback', true, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                like: false
            }),
        }).then(() => {
            this.props.fetchUserDetails(this.nickname());
        })
    };


    render() {


        const {userDetails, isLoaded, posts, isAuthenticated} = this.props;

        if (!isLoaded) {
            return <p>Ładowanie...</p>;
        }

        if (userDetails === null || posts === null) {
            return <p>Error :C</p>;
        }

        const {
            nickname,
            avatarUrl,
            postsCount,
            commentsCount,
            joinedAt,
            likes,
            dislikes,
        } = userDetails;

        return (
            <div>
                <div className="user-main">
                    <div className="user-main-avatar">
                        <img className="user-main-avatar-img" alt="qwe" src={avatarUrl}/>
                    </div>
                    <div className="user-main-info">
                        <header className="user-main-info-nickname">
                            {nickname}
                        </header>
                        <div>
                            <p>Liczba wpisów: {postsCount}</p>
                            <p>liczna komentarzy: {commentsCount}</p>
                            <p>Data rejestracji: {joinedAt}</p>
                            <p>Feedback: +{likes} / {-1 * dislikes}</p>
                        </div>
                        {   isAuthenticated?
                            <div className={"user-actions"}>
                                <button onClick={this.like} className={"user-button user-like"}>+1</button>
                                <button onClick={this.dislike} className={"user-button user-dislike"}>-1</button>
                            </div>:""
                        }
                    </div>
                </div>
                <MemePagination posts={posts} refresh={this.refresh}
                                nextPageUrl={"/user/" + this.nickname() + "/" + (parseInt(this.pageId()) + 1)}/>
            </div>
        );
    }
}


export default connect(state => {
    return {
        userDetails: state.userPage.userDetails,
        posts: state.userPage.posts,

        error: state.userPage.error,
        isLoaded: state.userPage.isLoaded,

        isAuthenticated: state.auth.isAuthenticated,
    };
}, dispatch => {
    return {
        fetchUserDetails: (nickname) => dispatch(fetchUserDetails(nickname)),
        fetchUserPosts: (nickname, page) => dispatch(fetchUserPosts(nickname, page))
    };
})(UserPage);
