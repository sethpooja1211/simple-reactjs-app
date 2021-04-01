import React, { Component } from 'react';
import Products from './productDetails'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/productlist"/>
                )}/>
                 <Route exact path='/productlist' component={Products} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
