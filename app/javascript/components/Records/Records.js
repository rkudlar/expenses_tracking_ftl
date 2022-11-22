import React from "react";
import { Container } from "react-bootstrap";
import MapperOwner from "./MapperOwner";
import MapperSharing from "./MapperSharing";


function Records(props) {

  const total = props.records.reduce((total, record) => {
    return total + record.spent;
  }, 0);

  return (
    <>
      {
        props.records.length === 0 && props.owner ?
          <p className="h4 text-center my-5">Your expense list is empty</p> :
        props.records.length === 0 ?
          <p className="h4 text-center my-5">Select the user whose expenses you want to view</p> :
          <Container>
            <p className="h2">Total: {total}</p>
            <table className="table table-hover">
              <thead>
              <tr>
                <th scope="col">Spent</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                {props.owner ? <th scope="col">Actions</th> : null}
              </tr>
              </thead>
              {props.owner ? <MapperOwner records={props.records} /> : <MapperSharing records={props.records} />}
            </table>
          </Container>
      }
    </>
  );
}

export default Records;
