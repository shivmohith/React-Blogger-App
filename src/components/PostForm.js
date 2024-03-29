import React, { Component } from 'react';

import categoryService from '../services/CategoryService';
import {connect} from 'react-redux';
class PostForm extends Component {
  state = {
    id: 0,
    title: '',
    content: '',
    author: '',
    category: '',

    initialized: false,
    // categories: []
  }

  static getDerivedStateFromProps(props, state) {
    if (props.operation === 'Update' && props.post && !state.initialized) {
      return {
        ...props.post,
        initialized: true
      };
    }

    return null;
  }

  // async componentDidMount() {
  //   try {
  //   const categories = await categoryService.getAll();
  //   this.setState({ categories: categories })
  //   } catch (error) {
  //     console.log('Get all categories failed');
  //     console.log('Error: ',error);
  //   }
  // }

  handleSubmit = e => {
    e.preventDefault();

    const { id, title, content, author, category } = this.state;
    this.props.onSubmit({
      id,
      title,
      content,
      author,
      category
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { operation } = this.props;
    const { title, content, author, category} = this.state;
    const  categories = this.props.categories

    return <div>
      <h4 className="mr-3">{operation} Post</h4>

      <div className="card bg-light">
        <div className="card-content">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">content</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                placeholder="Enter content"
                rows="3"
                cols="30"
                value={content}
                onChange={this.handleChange}
              >
              </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                placeholder="Enter author"
                value={author}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                required
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={this.handleChange}
              >
                <option value="">--Select--</option>
                {categories.map(c => <option
                  key={c.id} value={c.id}>{c.name}</option>
                )}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>

    </div>;
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
export default connect(mapStateToProps, null)(PostForm);