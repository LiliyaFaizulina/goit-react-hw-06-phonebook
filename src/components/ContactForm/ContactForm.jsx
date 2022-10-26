import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, FormButton, Label } from './ContactForm.styled';
import { addContact } from 'redux/contactsSlice';
import { selectedContacts } from 'redux/selectors';

const nameCheckMessage =
  "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const telCheckMessage =
  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectedContacts);
  const dispatch = useDispatch();

  const handleInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const notify = name => toast(`${name} is already in contacts`);

  const handleSubmit = e => {
    e.preventDefault();
    const newName = name.toLowerCase();

    if (contacts.some(contact => contact.name.toLowerCase() === newName)) {
      notify(name);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));

    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          onChange={handleInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title={nameCheckMessage}
          required
        />
      </Label>
      <Label>
        Number
        <input
          onChange={handleInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title={telCheckMessage}
          required
        />
      </Label>
      <FormButton type="submit">Add contact</FormButton>
    </Form>
  );
};
