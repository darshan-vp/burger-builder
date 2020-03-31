import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

  render () {
    return (
      <div>
        <Layout>
            {/* Switch component of react router dom is used to load exactly one route at a time
            Below out of three only one route will be rendered on the final HTML
            If we remove switch it will render routes matching with string entered in path
            e.g for '/orders' path '/' URL's component will also get rendered as '/orders' contains '/'
            same thing for '/checkout' if we remove switch.
            Need to remember here that ordering <Route> matters inside <switch> you need to keep '/'
            path at last so it will first path mathching with string entered in URL. if user enters '/orders' in url
            but '/orders' route is below '/' then '/' route component will be loaded because '/' mathces with '/orders

            Alternate to Switch------

            We can also pass exact attribute to <Route>. This will match exact string of path so if User enters URL '/orders'
            then it will match whole path '/orders' and component only will get rendered. If we use exact then ordering of <Route>
            doesn't matter

            */}

            <Switch>
                <Route path="/orders" exact component={Orders} />
                <Route path="/checkout" exact component={Checkout} />
                <Route path="/" component={BurgerBuilder} />
            </Switch>

        </Layout>
      </div>
    );
  }
}

export default App;