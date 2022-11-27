import React from "react";

function MapperSharing(props) {

  return (
    <tbody>
    { props.records.map((record, index) => (
      <tr key={index}>
        <td>{record.spent}</td>
        <td>{record.description}</td>
        <td>{record.category}</td>
      </tr>
    )) }
    </tbody>
  );
}

export default MapperSharing;
