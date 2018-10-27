import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//pages
import Main from './components/Main';

//hoc
import withAuth from './hoc/Auth';
import withStyles from './hoc/Styles';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(withAuth(App));
