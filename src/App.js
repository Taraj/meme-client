import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.less'

import Home from './routes/Home'
import Queue from './routes/Queue'
import MemePage from './routes/MemePage'
import RandomPage from './routes/RandomPage'

class App extends React.Component {
    render() {
        return (
            <main>
                <nav className="menu-main">
                    <a className="menu-main-link" href="/">Główna</a>
                    <a className="menu-main-link" href="/queue">Poczekalnia</a>
                    <a className="menu-main-link" href="/random">Losowe</a>
                    <a className="menu-main-link" href="#">Zaloguj</a>
                </nav>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={["/", "/home", "/home/", "/home/:id"]} component={Home}/>
                        <Route path={["/queue", "/queue/", "/queue/:id"]} component={Queue}/>
                        <Route path="/meme/:id" component={MemePage}/>
                        <Route path="/random" component={RandomPage}/>
                    </Switch>
                </BrowserRouter>
            </main>

        );
    }
}

export default App;
