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

class App extends Component {
  render() {
    return (
      <div>
        <span className="heading">Title</span>
      </div>
      // <div>
      //   <Router>
      //     <Switch>
      //       <Route path="/" exact={true} component={Home} />
      //       <Route path="/books" exact={true} component={BooksList} />
      //       <Route path='/books/:id' component={BookPurchase} />
      //       <Route path='/cart' component={BookCart}/>
      //       <Route path='/buy' component={BuyerPage}/>
      //       <Route path='/orders' component={OrderPage}/>
      //     </Switch>
      //   </Router>
      // </div>
    )
  }
}

export default App;
