import React from "react";

import css from '../Css/App.css';
import LoginState from '../Config/LoginState';

class App extends React.Component
{

    render() {
        {LoginState.isLoggedIn() && this.GoToOrders()}
        return(
          <div>
          </div>
        );
    }

    GoToOrders() {
        window.location.href = "/orders";
    }
}
export default App;