import React from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import '../../css/App.css';
import Login from "./Login";
import Menu from "./Menu";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged : localStorage.getItem('authToken') ? true : false
        }
    }

    onLog = (login) => {
        this.setState({
            isLogged : login
        })
    }

    render() {
        return(<div className="App">
            <Router>
                <div>
                    <Menu isLogged={this.state.isLogged}/>
                    <Switch>
                        <Route exact path="/">
                            <Home {...this.props} />
                        </Route>
                        <Route path="/login" render={(props)=> (<Login onLog={this.onLog} isLogged={this.state.isLogged} {...props} />)}/>
                        <Route path="/logout" render={(props)=> (<Login onLog={this.onLog} isLogged={this.state.isLogged} {...props} />)}/>

                        <PrivateRoute path="/dashboard" />
                    </Switch>
                </div>
            </Router>
        </div>)
    }
}

export default App;
