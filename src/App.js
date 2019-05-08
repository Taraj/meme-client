import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'


import './App.less'
import {connect} from "react-redux";
import {Navbar} from './components/Navbar/Navbar';


import HomePage from './routes/main/HomePage';
import QueuePage from './routes/main/QueuePage';
import UserPage from './routes/main/UserPage';
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import MemePage from './routes/MemePage';
import RandomPage from './routes/RandomPage';
import AccountPage from './routes/AccountPage';
import TagPage from './routes/main/TagPage';
import {logout} from "./actions/auth";
import CreateMemePage from './routes/CreateMemePage';

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
                            <Route path="/tags/:name/:id" component={TagPage}/>
                            <Route path="/random" component={RandomPage}/>
                            <Route path={"/user/:nickname/:id"} component={UserPage}/>
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
                                    <Redirect to={"/"}/>
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
                            <Route path={"/add"}
                                   render={() => (
                                       !isAuthenticated ? (
                                           <Redirect to={"/login"}/>
                                       ) : (
                                           <CreateMemePage/>
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

