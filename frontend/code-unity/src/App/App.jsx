import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage, Register } from '@/LoginPage';
import '@/Style';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link" style={{ fontWeight: "bold", color: 'white' }}>
                                    Code Unity
                                </Link>
                            </div>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/" className="nav-item nav-link">Projects</Link>
                                <li class="nav-item">
                                    <div class="dropdown">
                                        <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                                            Username
                                    </button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="user">
                                            <a class="dropdown-item" href="/profile">Profile</a>
                                            <a class="dropdown-item" href="#">Messages</a>
                                            <a class="dropdown-item" href="#">My Favourites</a>

                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Applications</a>

                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Settings</a>
                                            <a onClick={this.logout} class="dropdown-item">Logout</a>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </nav>

                    }
                    <div>
                        <Switch>
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute path="/" component={HomePage} />
                        </Switch>

                    </div>
                </div>

            </Router>
        );
    }
}

export { App }; 