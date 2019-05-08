import React from 'react';
import {Link} from 'react-router-dom';

import './Navbar.less';


export class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    toggleMobileMenu = () => {
        this.setState({
            active: !this.state.active
        })
    };


    render() {
        const {active} = this.state;
        return (
            <nav className="menu-main">
                <header className="menu-main-title">
                    Meme
                </header>
                <div className={"menu-main-link-container" +
                (active ? " active" : "")} onClick={this.toggleMobileMenu}>
                    <Link className={"menu-main-link"} to="/">Główna</Link>
                    <Link className={"menu-main-link"} to="/queue">Poczekalnia</Link>
                    <Link className={"menu-main-link"} to="/random">Losowe</Link>
                    {this.props.isAuthenticated ? (
                        <Link className={"menu-main-link"} to={"/add"}>Dodaj</Link>
                    ) : (
                        <Link className={"menu-main-link"} to={"/login"}>Zaloguj</Link>
                    )}
                    {this.props.isAuthenticated ? (
                        <Link className={"menu-main-link"} to={"/account"}>Konto</Link>
                    ) : (
                        null
                    )}
                    {this.props.isAuthenticated ? (
                        <Link className={"menu-main-link"} to={"/logout"}>Wyloguj</Link>
                    ) : (
                        null
                    )}
                </div>
                <i onClick={this.toggleMobileMenu} className="fas fa-bars menu-main-button"/>
            </nav>
        );
    }
}