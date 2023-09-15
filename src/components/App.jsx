import React from 'react';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import Form from './Form/Form';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';


const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount(){
    const contacts = JSON.parse(window.localStorage.getItem("contacts"))
    if (contacts?.length) {
      this.setState({contacts})
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      window.localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }

  handleChangeInput = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddContact = ({ name, number }) => {
    const contactExists = this.state.contacts.some(
      contact => contact.name === name
    );
    if (name && number) {
      if (!contactExists) {

        this.setState(prev => ({
          contacts: [...prev.contacts, { id: nanoid(), name, number }],
          name: '',
          number: '',
        }));
        toast.success(`${name} was added to contacts`);
      } else {
        toast.error(`${name} is already exist in contacts`);
        this.setState({ name: '', number: '' });
      }
    }
  };

  handleDeleteContact = id => {
    this.setState(prev => ({contacts: [...prev.contacts.filter(contact => contact.id !== id )]}))
  }

  filteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredData = this.filteredContacts();
    return (
      <div className="wrapper">
        <h1>Phonebook</h1>
        <Form addContact={this.handleAddContact} />
        {contacts.length ? (
          <>
            <h2>Contacts</h2>
            <Filter
              onFilterChange={this.handleChangeInput}
              filterValue={filter}
            />
            <ContactsList contacts={filteredData} filterValue={filter} deleteContact={this.handleDeleteContact}/>
          </>
        ) : (
          'There are no contacts'
        )}
      </div>
    );
  }
}

export default App;
