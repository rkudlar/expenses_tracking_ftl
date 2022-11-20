import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_PATHS } from "../../packs/constants";
import {Button, Container, Form} from "react-bootstrap";

function ShareWith() {
  const [shareWith, setShareWith] = useState([]);
  const [username, setUsername] = useState('');
  const [submitRequested, setSubmitRequested] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.patch(`${BACKEND_PATHS.START_SHARING}`, {
      username: username
    }).then(() => {
      setSubmitRequested(true);
      setUsername('')
    })
      .catch(function(error){
        console.log(error)
      })
  }

  const stopSharing = id => {
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.patch(`${BACKEND_PATHS.STOP_SHARING}/${id}`, {
    }).then(() => {
      setSubmitRequested(true);
    })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.SHARE_WITH}`)
      .then(response => {
        setShareWith(response.data);
        setSubmitRequested(false);
      }).catch(error => console.log(error))
  }, [submitRequested])

  return (
    <>
      <Form onSubmit={onSubmit} className="mt-3">
        <div className="row g-2">
          <div className="col-4">
            <Form.Group className="form-floating my-3">
              <Form.Control className="form-control smaller_form" type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
              <Form.Label>Write username to add</Form.Label>
            </Form.Group>
          </div>
          <div className="col d-flex align-items-center mx-2">
            <Button type="submit" variant="outline-dark" size='lg'>Share</Button>
          </div>
        </div>
      </Form>
      <div className="col">
        <p className={'h2 mt-4'}>You share with:</p>
        <table className="table table-hover">
          <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          { shareWith.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="outline-dark" size="sm" className="mx-1"
                        onClick={() => stopSharing(user.id)}>
                  Stop sharing
                </Button>
              </td>
            </tr>
          )) }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShareWith;
