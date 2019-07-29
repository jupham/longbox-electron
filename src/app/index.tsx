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
                <div>
                    <LeftNav>
                        <div  style={{position: 'absolute', left:'84px', height: '100vh', width: 'calc(100vw - 84px)', padding: '5px', overflow: 'auto'}}>
                            <Route exact path='/' component={ComicGrid} />
                            <Route path='/import' component={Import} />
                            <Route path='/settings' component={Settings} />
                        </div>
                    </LeftNav>
                </div>
            </Router>
        );
    }
}

export default App;
