import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BACKEND_PATHS, UI_PATHS } from "../../packs/constants";

function MapperOwner(props) {
  const deleteRecord = id => {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.delete(`${BACKEND_PATHS.RECORDS}/${id}`, {
    })
      .then(function(){
        window.location.reload();
      })
      .catch(function(error){
        console.log(error)
      })
  }

  return (
    <tbody>
    { props.records.map((record, index) => (
      <tr key={index}>
        <td>{record.spent}</td>
        <td>{record.description}</td>
        <td>{record.category}</td>
        <td>
          <Button variant="outline-dark" size="sm" className="mx-1" href={`${UI_PATHS.RECORD}/${record.id}/edit`}>edit</Button>
          <Button variant="outline-dark" size="sm" className="mx-1" onClick={() => deleteRecord(record.id)}>destroy</Button>
        </td>
      </tr>
    )) }
    </tbody>
  );
}

export default MapperOwner;
