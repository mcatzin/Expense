import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Expenses extends Component {
  state = {
    date: new Date(),
    isLoading: true,
    expenses: [],
    Categories: [],
  };

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();

    this.setState({ Categories: body, isLoading: false });
  }
  handleChange;

  render() {
    const title = <h2>Add Expense</h2>;
    const { Categories, isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>;

    let optionList = Categories.map((category) => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ));
    return (
      <div>
        <AppNav />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Category</Label>
              <select>{optionList}</select>
              <Input
                type="text"
                name="category"
                id="category"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="expenseDate">Expense Date</Label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location" />
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{' '}
              <Button color="secondary" tag={Link} to="/categories">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Expenses;
