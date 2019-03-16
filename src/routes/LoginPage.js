import React from 'react';
import {connect} from "react-redux";
import {login} from '../actions/auth';
import {Link} from "react-router-dom";


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login = e => {
        e.preventDefault();
        this.props.login(this.state.username.trim(), this.state.password.trim());
    };

    inputEvent = e => {
        const {value, name} = e.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    render() {

        if (this.props.isAuthenticated) {
            return <p>Jesteś już zalogowany/a</p>;
        }

        return (
            <div className={"main-auth-container"}>
                {this.props.error ?
                    <div className={"main-auth-error"}> {this.props.error.message}</div>
                    :
                    ""
                }
                <form onSubmit={this.login}>
                    <input value={this.state.username} onChange={this.inputEvent} name={"username"} className={"main-auth-input"}
                           type="text" placeholder={"Login"}/>
                    <input value={this.state.password} onChange={this.inputEvent} name={"password"} className={"main-auth-input"}
                           type="password" placeholder={"Hasło"}/>
                    <input type="submit" className={"main-auth-submit"} value={"Zaloguj"}/>
                </form>
                <p>Nie masz jeszcze konta? <Link className={"main-auth-link"} to={"/register"}>Zarejestruj!!!</Link>
                </p>
            </div>
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
})(LoginPage);
