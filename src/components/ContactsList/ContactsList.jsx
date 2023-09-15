import React from 'react';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, deleteContact }) => {
  const dataToInsert = contacts.map(contact => {
    return (
      <li className="contact-item" id={contact.id} key={contact.id}>
        <span className="contact-name">
          {contact.name} {contact.number}
        </span>
        <button onClick={() => deleteContact(contact.id)} type="button">
          Delete
        </button>
      </li>
    );
  });
  return (
    <>
      <ul className="contacts-list">{dataToInsert}</ul>
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};

export default ContactsList;
