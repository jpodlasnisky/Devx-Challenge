import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/loading';
import { AuthContext } from './contexts/AuthContext';
import CreateProduct from './pages/CreateProduct';
import CreateUser from './pages/CreateUser';
import Home from './pages/Home';
import ListMyProducts from './pages/ListMyProducts';
import ListProducts from './pages/ListProducts';
import ListUsers from './pages/ListUsers';
import LoginApp from './pages/Login';

function CustomRoute({isPrivate, ...rest}: any) {
    const { loading, authenticated } = useContext(AuthContext);

    if(loading) {
        return <div><Loading /></div>
    }

    if(isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route { ...rest } />
}


function Routes() {
    return (
            <Switch>
                <CustomRoute path="/login" exact component={LoginApp} />
                <CustomRoute isPrivate path="/" exact component={Home} />
                <CustomRoute isPrivate path="/create-product" exact component={CreateProduct} />
                <CustomRoute isPrivate path="/list-products" exact component={ListProducts} />
                <CustomRoute isPrivate path="/list-my-products" exact component={ListMyProducts} />
                <CustomRoute isPrivate path="/create-user" exact component={CreateUser} />
                <CustomRoute isPrivate path="/users" exact component={ListUsers} />
            </Switch>
    )
}

export default Routes;