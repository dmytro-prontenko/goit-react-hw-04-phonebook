import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const mapState = {
    name: setName,
    number: setNumber,
  };

  const handleChangeInput = e => {
    mapState[e.target.name](e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <>
      <>
        <form className="contact-form" onSubmit={onSubmit}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              name="name"
              pattern="^[\p{L}' ]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChangeInput}
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
              onChange={handleChangeInput}
              value={number}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    </>
  );
};

Form.propTypes = {
  addContact: PropTypes.func,
};

export default Form;
