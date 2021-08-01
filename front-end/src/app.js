// components
import Toolbar from '@components/toolbar.js'
import Settingsbar from '@components/settingsbar.js'
import Canvas from '@components/canvas.js'
// routers
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// styled
import '@styles/app.scss'

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/:id">
                        <Toolbar />
                        <Settingsbar />
                        <Canvas />
                    </Route>
                    {/* `f${(+new Date()).toString(16)}` - возвращаем нам id */}
                    <Redirect to={`f${(+new Date()).toString(16)}`} />        
                </Switch>
            </div>
        </Router>
    );
}

export default App;
