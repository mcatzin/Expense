import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Table, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Expenses extends Component {
  emptyItem = {
    description : '' ,
        expensedate : new Date(),
        id:104,
        location : '',
        category : {id:1 , name:'Travel'}
  }

  constructor(props){
    super(props);

    this.state ={
      isLoading :false,
        Categories:[],
        Expenses : [],
        date :new Date(),
        item : this.emptyItem
    }
  }

  async remove(id){
    await fetch(`/api/expenses/${id}` , {
      method: 'DELETE' ,
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }

    }).then(() => {
      let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
      this.setState({Expenses : updatedExpenses});
    });

}
  

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ Categories: body});

    const responseExp = await fetch('/api/expenses');
    const bodyExp = await responseExp.json();
    this.setState({ Expenses: bodyExp, isLoading: false });
  }
  handleChange;

  render() {
    const title = <h2>Add Expense</h2>;
    const { Categories} = this.state;
    const {Expenses, isLoading } = this.state;

    if (isLoading) return <div>Loading...</div>;

    let optionList = Categories.map((category) => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ));


    let rows=
    Expenses.map((expense) =>(
      <tr key={expense.id}>
        <td>{expense.description}</td>
        <td>{expense.location}</td>
        <td>{expense.expensedate} </td>
        <td>{expense.category.name}</td>
        <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
      </tr>)
    )

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
              <Label for="expensedate">Expense Date</Label>
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

        <Container>
          <h3>Express List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width='30%'>Description</th>
                <th width='20%'>Location</th>
                <th width='20%'>Date</th>
                <th>Category</th>
                <th width='20%'>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>

          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenses;
