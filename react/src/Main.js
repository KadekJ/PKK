import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

// load navbar
import Navbar from "./component/Navbar";
//load halaman
import Penyewa from "./page/Penyewa";
import Motor from "./page/Motor";
import User from "./page/User";
import Login from "./page/Login";

class Main extends Component {
    render = () => {
      return (
        <Switch>
          {/* Load component tiap halaman */}
          <Route path="/login" component={Login} />

          <Route path="/penyewa">
            <Navbar />
            <Penyewa />
          </Route>

          <Route path="/motor">
            <Navbar />
            <Motor />
          </Route>

          <Route path="/user">
            <Navbar />
            <User />
          </Route>
        </Switch>
      );
    }
}
export default Main;
