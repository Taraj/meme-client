import React from 'react';
import {Link} from "react-router-dom";


export class Navbar extends React.Component {
    render() {
        return (
            <nav className="menu-main">
                <header className="menu-main-title">
                    Meme
                </header>
                <Link className={"menu-main-link"} to="/">Główna</Link>
                <Link className={"menu-main-link"} to="/queue">Poczekalnia</Link>
                <Link className={"menu-main-link"} to="/random">Losowe</Link>
                <Link className={"menu-main-link"} to={this.props.isAuthenticated ? "/account" : "/auth"}>Konto</Link>
                <i className="fas fa-bars menu-main-button"/>
            </nav>
        );
    }
}