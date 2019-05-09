import React from 'react';
import {connect} from "react-redux";
import {login} from '../actions/auth';
import {Link} from "react-router-dom";
import {callApi} from "../middleware/api";


class ConfirmResetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            code: ""
        }
    }

    reset = e => {
        e.preventDefault();
        callApi('/auth/reset/confirm' , false, {
            method: 'POST',
            headers:new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                usernameOrEmail: this.state.usernameOrEmail,
                code: this.state.code
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
                    <input value={this.state.usernameOrEmail} onChange={this.inputEvent} name={"usernameOrEmail"} className={"main-auth-input"}
                           type="text" placeholder={"Login lub Email"}/>
                    <input value={this.state.code} onChange={this.inputEvent} name={"code"} className={"main-auth-input"}
                           type="text" placeholder={"Kod"}/>
                    <input type="submit" className={"main-auth-submit"} value={"Resetuj"}/>

                </form>
<br/>
            </div>
        );
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.auth.isAuthenticated

    };
}, dispatch => {
    return {

    };
})(ConfirmResetPage);
