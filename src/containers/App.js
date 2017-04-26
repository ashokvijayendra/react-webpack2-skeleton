import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import { Home, Foo, Bar } from './routes/Routes';
import { Match } from 'react-router';

class App extends Component {
    render() {
        return (<div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/foo">Foo</Link></li>
                        <li><Link to="/bar">Bar</Link></li>
                    </ul>
                    <hr />
                    <Route exact path="/" component={Home} />
                    <Route path="/foo" component={Foo} />
                    <Route path="/bar" component={Bar} />
                </div>
        );
    }
}

export default App;
