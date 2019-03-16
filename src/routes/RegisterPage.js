import React from 'react';
import {connect} from "react-redux";
import {register} from '../actions/auth';
import {Link} from "react-router-dom";


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            inputError: null
        }
    }

    register = (e) => {
        e.preventDefault();
        const {
            nickname,
            username,
            email,
            password,
            confirmPassword
        } = this.state;

        this.setState({
            inputError: null
        });

        if (password !== confirmPassword) {
            this.setState({
                inputError: "Hasła są różne."
            });
            return
        }

        if (username.length < 3 || username.length > 32) {
            this.setState({
                inputError: "Login musi mieć od 3 do 32 znaków."
            });
            return
        }

        if (nickname.length < 3 || nickname.length > 32) {
            this.setState({
                inputError: "Nick musi mieć od 3 do 32 znaków."
            });
            return
        }

        if (password.length < 3 || password.length > 32) {
            this.setState({
                inputError: "Hasło musi mieć od 3 do 32 znaków."
            });
            return
        }

        this.props.register(nickname.trim(), username.trim(), email.trim(), password.trim());
    };

    inputEvent = e => {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        })
    };


    printError = () => {
        if (this.state.inputError) {
            return (
                <div className={"main-auth-error"}>{this.state.inputError}</div>
            )
        }

        if (this.props.error) {
            return (
                <div className={"main-auth-error"}>{this.props.error.message}</div>
            )
        }
    };

    render() {
        if (this.props.isAuthenticated) {
            return <p>Jesteś już zalogowany/a</p>;
        }

        return (
            <div className={"main-auth-container"}>
                {this.printError()}
                <form onSubmit={this.register}>
                    <input value={this.state.nickname} onChange={this.inputEvent} name={"nickname"}
                           className={"main-auth-input"}
                           type="text" placeholder={"Nick"} required min={3}/>
                    <input value={this.state.username} onChange={this.inputEvent} name={"username"}
                           className={"main-auth-input"}
                           type="text" placeholder={"Login"} required/>
                    <input value={this.state.email} onChange={this.inputEvent} name={"email"}
                           className={"main-auth-input"}
                           type="email" placeholder={"Email"} required/>
                    <input value={this.state.password} onChange={this.inputEvent} name={"password"}
                           className={"main-auth-input"}
                           type="password" placeholder={"Hasło"} required/>
                    <input value={this.state.confirmPassword} onChange={this.inputEvent} name={"confirmPassword"}
                           className={"main-auth-input"}
                           type="password" placeholder={"Powtórz hasło"} required/>

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
        register: (nickname, username, email, password) => dispatch(register(nickname, username, email, password))
    };
})(RegisterPage);
