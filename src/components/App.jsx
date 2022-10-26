import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { Head, SubHead, Container } from './App.styled';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  const notify = name => toast(`${name} is already in contacts`);

  const updateContactList = newContact => {
    const newName = newContact.name.toLowerCase();

    if (contacts.some(contact => contact.name.toLowerCase() === newName)) {
      notify(newContact.name);
      return;
    }

    const contact = {
      id: nanoid(),
      ...newContact,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const filterContacts = e => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ToastContainer position="top-center" />
      <Container>
        <Head>Phonebook</Head>
        <ContactForm
          contactList={contacts}
          updateContactList={updateContactList}
        />
        <SubHead>Contacts</SubHead>
        <SearchFilter filter={filter} filterContacts={filterContacts} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={deleteContact}
        />
      </Container>
    </>
  );
};
