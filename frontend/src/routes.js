import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import UpdateUser from './pages/UpdateUser';
import UsersProfile from './pages/usersProfile'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/search" component={Search} />
                <Route path="/updateUser" component={UpdateUser} />
                <Route path="/usersProfile" component={UsersProfile} />
            </Switch>
        </BrowserRouter>
    )
}