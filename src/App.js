import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'


import './App.less'

import Home from './routes/Home'
import Queue from './routes/Queue'
import MemePage from './routes/MemePage'
import RandomPage from './routes/RandomPage'
import User from './routes/User'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="menu-main">
                        <Link className="menu-main-link" to="/">Główna</Link>
                        <Link className="menu-main-link" to="/queue">Poczekalnia</Link>
                        <Link className="menu-main-link" to="/random">Losowe</Link>
                        <Link className="menu-main-link" to="#">Konto</Link>
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
