import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact(state, { payload }) {
      state.contacts.push(payload);
    },
    deleteContact(state, { payload }) {
      const idx = state.contacts.findIndex(contact => contact.id === payload);
      state.contacts.splice(idx, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
