import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { Head, SubHead, Container } from './App.styled';

export const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Container>
        <Head>Phonebook</Head>
        <ContactForm />
        <SubHead>Contacts</SubHead>
        <SearchFilter />
        <ContactList />
      </Container>
    </>
  );
};
