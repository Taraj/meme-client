import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import './App.less'

import Home from './routes/HomePage'
import Queue from './routes/QueuePage'
import MemePage from './routes/MemePage'
import RandomPage from './routes/RandomPage'
import User from './routes/UserPage'
import {connect} from "react-redux";

import {Navbar} from './components/Navbar/Navbar';
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar isAuthenticated={this.props.isAuthenticated}/>
                    <main className="main-container">
                        <Switch>
                            <Route exact path={["/", "/home/:id", "/home/", "/home"]} component={Home}/>
                            <Route path={["/queue/:id", "/queue/", "/queue"]} component={Queue}/>
                            <Route path="/meme/:id" component={MemePage}/>
                            <Route path="/random" component={RandomPage}/>
                            <Route path={"/user/:id"} component={User}/>
                            <Route path={"/login"} component={LoginPage}/>
                            <Route path={"/register"} component={RegisterPage}/>
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.data,
        error: state.auth.error
    };
})(App);

