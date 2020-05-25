import React from 'react';

import { Route, Redirect } from "react-router-dom";
import Dashboard from './Dashboard';

class PrivateRoute extends React.Component {

  render() {

    const { children, ...rest } = this.props;
    const token = localStorage.getItem('authToken') === 'true';

    console.log('token=>'+token)
      return (
        <Route 
          { ...rest }
          render={(rest) => {
              if(token) {
                  return (<Dashboard  {...rest} />)
              }
              else {
                  return (<Redirect to={{pathname : '/login', state : { from : "/"}}} />)
              }
          }}
        />
      );
  }
}

export default PrivateRoute;