import React from 'react';
import {connect} from "react-redux";

import {callApi} from "../middleware/api";

class AccountPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            avatar: "",
            password: "",
            confirmPassword: "",
            code: "",
            oldPassword:""

        }
    }

    inputEvent = e => {
        const {value, name} = e.target;
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    changeAvatar = e => {
        e.preventDefault();
        callApi("/self/avatar", true, {
            method: 'POST',
            body: JSON.stringify({
                avatarURL: this.state.avatar
            }),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(() => {
            alert('ok');
        }).catch(()=>{
            alert("err");
        })
    };

    changePassword = e => {
        e.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
            alert("Złe hasło");
            return;
        }

        if (this.state.password.length < 3 || this.state.password.length > 32) {
            alert("Złe hasło");
            return;
        }


        callApi("/self/password", true, {
            method: 'POST',
            body: JSON.stringify({
                newPassword: this.state.password,
                oldPassword: this.state.oldPassword
            }),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(() => {
            alert('ok');
        }).catch(()=>{
            alert("err");
        })
    };
    activeAccount = e => {
        e.preventDefault();
        callApi("/self/active", true, {
            method: 'POST',
            body: JSON.stringify({
                code: this.state.code
            }),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(() => {
            alert('ok');
        }).catch(()=>{
            alert("err");
        })
    };

    render() {

        return (
            <div>
                <form className={"main-acc-container"} onSubmit={this.changeAvatar}>
                    <input value={this.state.avatar} onChange={this.inputEvent} name={"avatar"}
                           placeholder={"Avatar URL"} type="text" className={"main-auth-input"}/>
                    <input type="submit" className={"main-auth-submit"} value={"Zmień"}/>
                </form>
                <form className={"main-acc-container"} onSubmit={this.changePassword}>

                    <input value={this.state.password} onChange={this.inputEvent} name={"password"}
                           placeholder={"Hasło"} type="password" className={"main-auth-input"}/>
                    <input value={this.state.confirmPassword} onChange={this.inputEvent} name={"confirmPassword"}
                           placeholder={"Powtórz Hasło"} type="password" className={"main-auth-input"}/>

                    <input value={this.state.oldPassword} onChange={this.inputEvent} name={"oldPassword"}
                           placeholder={"Stare Hasło"} type="password" className={"main-auth-input"}/>

                    <input type="submit" className={"main-auth-submit"} value={"Zmień"}/>
                </form>

                <form className={"main-acc-container"} onSubmit={this.activeAccount}>
                    <input value={this.state.code} onChange={this.inputEvent} name={"code"}
                           placeholder={"Kod Aktywacyjny"} type="text" className={"main-auth-input"}/>
                    <input type="submit" className={"main-auth-submit"} value={"Aktywuj"}/>
                </form>
            </div>
        );
    }
}

export default connect(state => {
    return {};
}, dispatch => {
    return {};
})(AccountPage);
