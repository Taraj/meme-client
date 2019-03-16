import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'


import './App.less'
import {connect} from "react-redux";
import {Navbar} from './components/Navbar/Navbar';


import HomePage from './routes/HomePage';
import QueuePage from './routes/QueuePage';
import UserPage from './routes/UserPage';
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import MemePage from './routes/MemePage';
import RandomPage from './routes/RandomPage';
import AccountPage from './routes/AccountPage';

import {logout} from "./actions/auth";

class App extends React.Component {

    render() {
        const {isAuthenticated, logout} = this.props;
        return (
            <BrowserRouter>
                <div>
                    <Navbar isAuthenticated={isAuthenticated}/>
                    <main className="main-container">
                        <Switch>
                            <Route exact path={["/", "/home/:id", "/home/", "/home"]} component={HomePage}/>
                            <Route path={["/queue/:id", "/queue/", "/queue"]} component={QueuePage}/>
                            <Route path="/meme/:id" component={MemePage}/>
                            <Route path="/random" component={RandomPage}/>
                            <Route path={"/user/:id"} component={UserPage}/>
                            <Route path={"/login"}
                                   render={() => (
                                       isAuthenticated ? (
                                           <Redirect to={"/account"}/>
                                       ) : (
                                           <LoginPage/>
                                       )
                                   )}
                            />
                            <Route path={"/register"} render={() => (
                                isAuthenticated ? (
                                    <Redirect to={"/account"}/>
                                ) : (
                                    <RegisterPage/>
                                )
                            )}/>
                            <Route path={"/logout"} render={() => {
                                logout();
                                return <Redirect to={"/login"}/>
                            }}/>

                            <Route path={"/account"}
                                   render={() => (
                                       !isAuthenticated ? (
                                           <Redirect to={"/login"}/>
                                       ) : (
                                           <AccountPage/>
                                       )
                                   )}
                            />
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
}, dispatch => {
    return {
        logout: () => dispatch(logout())
    };
})(App);

