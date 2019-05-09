import React from 'react';
import {connect} from "react-redux";
import {login} from '../actions/auth';
import {Link} from "react-router-dom";
import {callApi} from "../middleware/api";


class ResetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
        }
    }

    reset = e => {
        e.preventDefault();
        callApi('/auth/reset/' , false, {
            method: 'POST',
            headers:new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                usernameOrEmail: this.state.usernameOrEmail
            }),
        }).then(() => {
            alert("ok");
        })
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
                <form onSubmit={this.reset}>
                    <input value={this.state.username} onChange={this.inputEvent} name={"usernameOrEmail"} className={"main-auth-input"}
                           type="text" placeholder={"Login lub Email"}/>
                    <input type="submit" className={"main-auth-submit"} value={"Resetuj"}/>
                </form>
                <p>Masz już kod? <Link className={"main-auth-link"} to={"reset-confirm"}>Potwierdz!!!</Link></p>

            </div>
        );
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}, dispatch => {

})(ResetPage);
