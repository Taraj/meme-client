import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'


import './App.less'

import Home from './routes/HomePage'
import Queue from './routes/QueuePage'
import MemePage from './routes/MemePage'
import RandomPage from './routes/RandomPage'
import User from './routes/UserPage'



class App extends React.Component {
    constructor(prps) {
        super(prps);
        this.state = {
            mobileMenuIsOpen: ""
        }
    }

    toggleMenu = () => {
        if (this.state.mobileMenuIsOpen === "") {
            this.setState({mobileMenuIsOpen: " menu-main-link-active"})
        } else {
            this.setState({mobileMenuIsOpen: ""})
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="menu-main">
                        <header className="menu-main-title">
                            Meme
                        </header>
                        <Link className={"menu-main-link" + this.state.mobileMenuIsOpen} onClick={this.toggleMenu}
                              to="/">Główna</Link>
                        <Link className={"menu-main-link" + this.state.mobileMenuIsOpen} onClick={this.toggleMenu}
                              to="/queue">Poczekalnia</Link>
                        <Link className={"menu-main-link" + this.state.mobileMenuIsOpen} onClick={this.toggleMenu}
                              to="/random">Losowe</Link>
                        <Link className={"menu-main-link" + this.state.mobileMenuIsOpen} onClick={this.toggleMenu}
                              to="#">Konto</Link>
                        <i onClick={this.toggleMenu} className="fas fa-bars menu-main-button"/>
                    </nav>
                    <main className="main-container">
                        <Switch>
                            <Route exact path={["/", "/home/:id", "/home/", "/home"]} component={Home}/>
                            <Route path={["/queue/:id", "/queue/", "/queue"]} component={Queue}/>
                            <Route path="/meme/:id" component={MemePage}/>
                            <Route path="/random" component={RandomPage}/>
                            <Route path={"/user/:id"} component={User}/>
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

