import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    window.location = "/login"
  }
  render() {
    return (
      <div className="navbar navbar-expand-lg bg-danger navbar-dark">
        <button type="button" className="navbar-toggler navbar-toggler-right"
        data-toggle="collapse" data-target="#menu">
          <span className="navbar navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">
            {/*list menu */}
            <li className="navbar-item">
              <Link className="nav-link" to="/penyew">Penyewa</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/motor">Data Motor </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/user">Admin</Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/pemilik">Pemilik</Link>
            </li>
            <li className="navbar-item">
              <a className="nav-link" onClick={this.Logout}>Logout</a>
            </li>
          </ul>
      </div>
    </div>
  );
  }
}

export default Navbar;
