import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_PATHS } from "../../packs/constants";
import { Button, Container, Form } from "react-bootstrap";

function Filter(props) {
  console.log(props)
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoriesChange = (e) => {setSelectedCategory(categories[e.target.value])}

  const onSubmit = (e) => {
    e.preventDefault();
    axios.get(`${BACKEND_PATHS.RECORDS}`, {
      params: { from: fromValue, to: toValue, category: selectedCategory, owner_id: props.ownerId }
    }).then((response) => {
      props.stateChangerRecords(response.data)
    })
      .catch(function(error){
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`${BACKEND_PATHS.CATEGORIES}`)
      .then(response => {
        setCategories(response.data);
      }).catch(error => console.log(error))
  }, [])

  return (
    <Container>
      <p className="h2 mt-4 mb-0">Filter:</p>
      <Form onSubmit={onSubmit} className="mb-2">
        <div className="row g-2">
          <div className="col-2">
            <Form.Group className="form-floating my-3">
              <Form.Control className="form-control smaller_form" type="text"
                            placeholder="from value"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}/>
              <Form.Label>Set spent from</Form.Label>
            </Form.Group>
          </div>
          <div className="col-2">
            <Form.Group className="form-floating my-3">
              <Form.Control className="form-control smaller_form" type="text"
                            placeholder="to value"
                            value={toValue}
                            onChange={(e) => setToValue(e.target.value)}/>
              <Form.Label>Set spent to</Form.Label>
            </Form.Group>
          </div>
          <div className="col-2">
            <Form.Group className="my-3">
              <Form.Select className="select-custom-size" onChange={e => handleCategoriesChange(e)}>
                <option>All</option>
                {categories.map((category, index) => (
                  <option key={index} value={index}>{category.name}</option>)
                )}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col d-flex align-items-center mx-2">
            <Button type="submit" variant="outline-dark" size='lg'>Filter</Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default Filter;
