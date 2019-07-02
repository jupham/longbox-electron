import React, { Component } from 'react';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import LeftNav from './components/leftnav';
import ComicGrid from './components/comicgrid';
import Import from './components/import';
import Settings from './components/settings';
import { Container } from 'semantic-ui-react';

class App extends Component {
    render() {
        return (
            <Router>
                <div
                    style={{
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <LeftNav>
                    <Route exact path='/' component={ComicGrid} />
                        <Route path='/import' component={Import} />
                        <Route path='/settings' component={Settings} />
                    </LeftNav>
                </div>
            </Router>
        );
    }
}

export default App;
