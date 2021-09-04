import ContactItem from './ContactItem';

const ContactList = ({ removeContact, contacts }) => {
  return (
    <ul>
      <ContactItem removeContact={removeContact} contacts={contacts} />
    </ul>
  );
};

export default ContactList;
