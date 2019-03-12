import React from 'react';
import {connect} from "react-redux";
import {login} from '../actions/auth';


class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    changeUsername = e => {
        this.setState(
            {
                username: e.target.value,
                password: this.state.password
            });
    };
    changePassword = e => {
        this.setState(
            {
                username: this.state.username,
                password: e.target.value
            });
    };


    render() {

        if (this.props.isAuthenticated) {
            return <p>Jesteś już zalogowany/a</p>;
        }

        return (

            <form onSubmit={this.login}>
                {this.props.error ? this.props.error.message : ""}
                <input value={this.state.username} onChange={this.changeUsername} type="text"/>
                <input value={this.state.password} onChange={this.changePassword} type="password"/>
                <input type="submit"/>
            </form>
        );
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.data,
        error: state.auth.error
    };
}, dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
})(AuthPage);
