import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class Form extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.addContact({ name, number });
    this.setState({ number: '', name: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form className="contact-form" onSubmit={this.onSubmit}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              pattern="^[\p{L}' ]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChangeInput}
              value={name}
            />
          </label>
          <label htmlFor="number">
            Number
            <input
              id="number"
              type="tel"
              name="number"
              pattern="^\+380\d{9}$"
              title="Phone number must be like +380*********"
              placeholder="+38**********"
              required
              onChange={this.handleChangeInput}
              value={number}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  addContact: PropTypes.func,
};

export default Form;
