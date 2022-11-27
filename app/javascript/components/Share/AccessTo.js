  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { BACKEND_PATHS } from "../../packs/constants";
  import { Button } from "react-bootstrap";
  import Records from "../Records/Records";
  import Filter from "../Records/Filter";

  function AccessTo() {
    const [accessTo, setAccessTo] = useState([]);
    const [records, setRecords] = useState([]);
    const [ownerId, setOwnerId] = useState("");

    const checkingExpenses = id => {
      axios.get(`${BACKEND_PATHS.RECORDS}`, {
        params: {
          owner_id: id
        }
      }).then((response) => {
        setRecords(response.data);
        setOwnerId(id)
      })
        .catch(function(error){
          console.log(error)
        })
    }

    useEffect(() => {
      axios.get(`${BACKEND_PATHS.ACCESS_TO}`)
        .then(response => {
          setAccessTo(response.data);
        }).catch(error => console.log(error))
    }, [])

    return (
      <>
        <div className="col">
          <p className={'h2 mt-4'}>These users share with you:</p>
          <table className="table table-hover">
            <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            { accessTo.map((user, index) => (
              <tr key={index}>
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="outline-dark" size="sm" className="mx-1"
                          onClick={() => checkingExpenses(user.id)}>
                    Checking expenses
                  </Button>
                </td>
              </tr>
            )) }
            </tbody>
          </table>
        </div>
        <Filter stateChangerRecords={setRecords} ownerId={ownerId} />
        <Records records={records} owner={false} />
      </>
    );
  }

  export default AccessTo;
