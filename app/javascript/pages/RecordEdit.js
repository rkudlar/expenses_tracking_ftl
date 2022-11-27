import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_PATHS } from "../packs/constants";
import Header from "../components/Header/Header";

function RecordEdit() {
  const [spent, setSpent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedСategory, setSelectedСategory] = useState("");
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const handleCategoriesChange = (e) => {setSelectedСategory(categories[e.target.value])}

  const onSubmit = (e) => {
    e.preventDefault();
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.patch(`${BACKEND_PATHS.RECORDS}/${params.id}`, {
      record: {
        spent: spent,
        description: description,
        category_id: selectedСategory.id
      }
    })
      .then(function(response){
        if (response.status === 200) {
          window.location.replace('/');
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.RECORDS}/${params.id}/edit`)
      .then(response => {
        setSpent(response.data.spent);
        setDescription(response.data.description);
        setSelectedСategory(response.data.category);
      }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.CATEGORIES}`)
      .then(response => {
        setCategories(response.data);
      }).catch(error => console.log(error))
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="my-3">
            <Form.Label>Spent</Form.Label>
            <Form.Control className="input" type="text"
                          placeholder="Spent"
                          value={spent}
                          onChange={(e) => setSpent(e.target.value)}/>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Description</Form.Label>
            <Form.Control className="input" type="text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={e => handleCategoriesChange(e)}>
              {categories.map((category, index) => (
                category.id === selectedСategory.id ?
                (<option selected key={index} value={index}>{category.name}</option>):
                  (<option key={index} value={index}>{category.name}</option>))
              )}
            </Form.Select>
          </Form.Group>
          <div className="input-button text-center my-3">
            <Button
              type="submit"
              variant="outline-dark">
              Edit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default RecordEdit;
