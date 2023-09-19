import React, { useEffect, useState } from 'react';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Form from './Form/Form';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const mapState = {
    filter: setFilter,
  };

  useEffect(()=>{
    const contactsFromLocal = JSON.parse(window.localStorage.getItem("contacts"))
        if (contactsFromLocal?.length) {
          setContacts(contactsFromLocal)
        }
  },[])

  useEffect((prev)=>{
    if (prev !== contacts) {
            window.localStorage.setItem("contacts", JSON.stringify(contacts))
          }
  },[contacts])

  const handleChangeInput = e => {
    const { name, value } = e.target;
    mapState[name](value);
  };

  const handleAddContact = ({ name, number }) => {
    const contactExists = contacts.some(contact => contact.name === name);
    if (name && number) {
      if (!contactExists) {
        setContacts(prev => [...prev, { id: nanoid(), name, number }]);
        toast.success(`${name} was added to contacts`);
      } else {
        toast.error(`${name} is already exist in contacts`);
      }
    }
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredData = filteredContacts();

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <Form addContact={handleAddContact} />
      {contacts.length ? (
        <>
          <h2>Contacts</h2>
          <Filter onFilterChange={handleChangeInput} filterValue={filter} />
          <ContactsList
            contacts={filteredData}
            filterValue={filter}
            deleteContact={handleDeleteContact}
          />
        </>
      ) : (
        'There are no contacts'
      )}
    </div>
  );
};

export default App;

