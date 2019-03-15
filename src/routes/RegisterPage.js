import React from 'react';
import {connect} from "react-redux";
import {login} from '../actions/auth';
import {Link} from "react-router-dom";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    login = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    changeNickname = e => {
        this.setState(
            {
                ...this.state,
                nickname: e.target.value
            });
    };

    changeUsername = e => {
        this.setState(
            {
                ...this.state,
                username: e.target.value
            });
    };

    changeEmail = e => {
        this.setState(
            {
                ...this.state,
                email: e.target.value
            });
    };
    changePassword = e => {
        this.setState(
            {
                ...this.state,
                password: e.target.value
            });
    };
    changeConfirmPassword = e => {
        this.setState(
            {
                ...this.state,
                confirmPassword: e.target.value
            });
    };


    render() {

        if (this.props.isAuthenticated) {
            return <p>Jesteś już zalogowany/a</p>;
        }

        return (
            <div className={"main-auth-container"}>
                {this.props.error ?
                    <div className={"main-auth-error"}>złe cos tam cos tam</div>
                    :
                    ""
                }
                <form onSubmit={this.login}>
                    <input value={this.state.nickname} onChange={this.changeNickname} className={"main-auth-input"}
                           type="text" placeholder={"Nick"}/>
                    <input value={this.state.username} onChange={this.changeUsername} className={"main-auth-input"}
                           type="text" placeholder={"Login"}/>
                    <input value={this.state.email} onChange={this.changeEmail} className={"main-auth-input"}
                           type="email" placeholder={"Email"}/>
                    <input value={this.state.password} onChange={this.changePassword} className={"main-auth-input"}
                           type="password" placeholder={"Hasło"}/>
                    <input value={this.state.changeConfirmPassword} onChange={this.changeConfirmPassword} className={"main-auth-input"}
                           type="password" placeholder={"Powtórz hasło"}/>


                    <input type="submit" className={"main-auth-submit"} value={"Zarejestruj"}/>
                </form>
                <p>Masz już konto? <Link className={"main-auth-link"} to={"/login"}>Zaologuj!!!</Link>
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
})(RegisterPage);
