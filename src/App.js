import React, { Component } from 'react';
import Home from './Home';
import GroupList from './component/GroupList';
import GroupEdit from './component/GroupEdit';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppNavbar from './component/AppNavbar';
import BooksList from './component/BooksList';
import BookCart from './component/BookCart';
import BookPurchase from './component/BookPurchase';
import BuyerPage from './component/BuyerPage';
import OrderPage from './component/OrderPage';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={props => <Home {...props} />} />
          <Route path="/books" exact={true} component={props => <BooksList {...props} />} />
          <Route path='/books/:id' component={props => <BookPurchase {...props} />} />
          <Route path='/cart' component={props => <BookCart {...props} />} />
          <Route path='/buy' component={props => <BuyerPage {...props} />} />
          <Route path='/orders' component={props => <OrderPage {...props} />} />
        </Switch>
      </Router>
    </div>
  )
}
