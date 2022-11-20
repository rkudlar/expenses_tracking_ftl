import React, { useState } from "react";
import Header from "../components/Header/Header";
import ShareWith from "../components/Share/ShareWith";
import AccessTo from "../components/Share/AccessTo";
import { Container } from "react-bootstrap";

function Share() {

  return (
    <div>
      <Header />
      <Container>
        <div className="row">
          <ShareWith />
          <AccessTo />
        </div>
      </Container>
    </div>
  );
}

export default Share;
