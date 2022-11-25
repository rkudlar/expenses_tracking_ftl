import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { BACKEND_PATHS } from "../packs/constants";
import Header from "../components/Header/Header";
import FlashMessage from 'react-flash-message';

function RecordAdd() {
  const [spent, setSpent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const handleCategoriesChange = (e) => {setSelectedCategory(categories[e.target.value])}

  const onSubmit = (e) => {
    e.preventDefault();
    setShowMessage(false);
    const token = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.post(`${BACKEND_PATHS.RECORDS}`, {
      spent_record: {
        spent: spent,
        description: description,
        category_id: selectedCategory.id
      }
    })
      .then(function(response){
        if (response.status === 200) {
          window.location.replace('/');
        }
        else {
          setShowMessage(true)
        }
      })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.CATEGORIES}`)
      .then(response => {
        setCategories(response.data);
        setSelectedCategory(response.data[0])
      }).catch(error => console.log(error))
  }, [])

  return (
    <>
      <Header />
      <Container>
        { showMessage &&
            <div>
              <FlashMessage duration={5000}>
                <div className="alert alert-danger mt-2" role="alert">
                  Incorrect !
                </div>
              </FlashMessage>
            </div>
        }
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
                    <option key={index} value={index}>{category.name}</option>)
                )}
              </Form.Select>
            </Form.Group>
            <div className="input-button text-center my-3">
              <Button
                type="submit"
                variant="outline-dark">
                Create
              </Button>
            </div>
          </Form>
        </Container>
    </>
  );
}

export default RecordAdd;
