import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { userService, authenticationService } from '@/_services';
import { Dashboard, GroupList, GroupChat, Profile } from '@/Board';
import { CreateGroup } from '@/CreateGroup';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getProfile().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div class="container-fluid">
                <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                  <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                      <li class="nav-item">
                       <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                          <span>Dashboard</span>
                          <a class="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                          </a>
                        </h6>
                        <a class="nav-link active" href="/groupchat">
                          <span data-feather="home"></span>
                          Group Chat <span class="sr-only">(current)</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span data-feather="file"></span>
                          Friends
                          <span class="badge badge-pill bg-light align-text-bottom">27</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span data-feather="shopping-cart"></span>
                          Messages
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/profile">
                          <span data-feather="shopping-cart"></span>
                          My Profile
                        </a>
                      </li>
                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                      <span>Group infos</span>
                      <a class="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                      </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                      <li class="nav-item">
                        <a class="nav-link" href="/groupList">
                          <span></span>
                        Group List
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/CreateGroup">
                          <span data-feather="file-text"></span>
                        Create a Group
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span data-feather="file-text"></span>
                          Coming Soon...
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span data-feather="file-text"></span>
                          Coming Soon...
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>

                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Switch>
                    <Route path="/grouplist" component={GroupList} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/groupchat" component={GroupChat} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/CreateGroup" component={CreateGroup} />
                </Switch>

                </main>
                </div>
            </div>
        );
    }
}

export { HomePage };