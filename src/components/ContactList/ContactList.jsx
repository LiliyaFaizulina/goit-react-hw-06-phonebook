import { useSelector, useDispatch } from 'react-redux';
import { selectedContacts, selectedFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import { List, ContactItem, DeleteButton } from './ContactList.styled';
import icon from '../../images/addressBook.svg';

export const ContactList = () => {
  const contacts = useSelector(selectedContacts);
  const filter = useSelector(selectedFilter);
  const dispatch = useDispatch();

  const visualContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <List>
      {visualContacts.map(({ name, number, id }) => (
        <ContactItem key={id}>
          <img src={icon} alt="Icon" width="24" height="24" />
          <p>
            {name}: {number}
          </p>
          <DeleteButton
            type="button"
            onClick={() => {
              dispatch(deleteContact(id));
            }}
          >
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </List>
  );
};
