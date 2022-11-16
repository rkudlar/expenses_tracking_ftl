import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import axios from "axios";

import {Link} from "react-router-dom";

function Header() {

  const handleSignOut = event => {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.delete('/users/sign_out', {
    })
      .catch(function(error){
        console.log(error)
      })
      .then(function(){
        window.location.href = '/user/sign_in'
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
            <button onClick={handleSignOut} className="btn custom-btn">Вихід</button>
          </div>
        </Nav>
      </Navbar>
    </header>
  );
}

export default Header;
