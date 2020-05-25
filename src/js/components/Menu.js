import React from 'react';
import {Link, NavLink} from "react-router-dom";

class Menu extends React.Component {
  render() {

    return(<div className="menu">
      <ul className={"nav"}>
        <li>
          <NavLink
              className={"nav-link"}
              exact
              to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
              className={"nav-link"}
              to="/dashboard"
          >Dashboard</NavLink>
        </li>
        <li className={"nav-item"}>
          {
            this.props.isLogged
              ? <Link className={"nav-link"} to="/logout">Logout</Link>
              : <Link className={"nav-link"} to="/login">Login</Link>
          }

        </li>
      </ul>
      <hr />

    </div>)
  }
}


export default Menu;
