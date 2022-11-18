import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import axios from "axios";

import { Link, NavLink } from "react-router-dom";
import { BACKEND_PATHS, UI_PATHS } from "../../packs/constants";

function Header() {

  const handleSignOut = event => {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.delete(`${BACKEND_PATHS.USER_SIGN_OUT}`, {
    })
      .catch(function(error){
        console.log(error)
      })
      .then(function(){
        window.location.href = `${BACKEND_PATHS.USER_SIGN_IN}`
      })
    return true
  }

  return (
    <header>
      <div className="bg-black py-2 pt-4">
        <Link to="/" className="nav-link">
          <h1 className="text-center fw-bold fst-italic text-light">Expenses Tracking</h1>
        </Link>
      </div>

      <Navbar bg="black" variant="dark">
        <Nav className="me-auto container-fluid">
          <div className="collapse navbar-collapse justify-content-md-center">
            <NavLink exact to={`${UI_PATHS.RECORD_NEW}`} className="nav-link">Add record</NavLink>
            <button onClick={handleSignOut} className="btn custom-btn">Exit</button>
          </div>
        </Nav>
      </Navbar>
    </header>
  );
}

export default Header;
