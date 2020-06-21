import React, { Component } from 'react';

class Category extends Component {
  state = {
    isLoading: true,
    Category: [],
  };

  async componentDidMount() {
    const response = await fetch('/api/categories');
    const body = await response.json();
    this.setState({ Category: body, isLoading: false });
  }
  render() {
    const { Category, isLoading } = this.state;
    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        <h2>Category</h2>
        {Category.map((category) => (
          <div id={category.id}>{category.name}</div>
        ))}
      </div>
    );
  }
}
export default Category;
