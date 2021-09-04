import s from './ContactItem.module.css';

const ContactItem = ({ removeContact, contacts }) => {
  return contacts.map(({ name, number, id }) => {
    return (
      <li className={s.item} key={id}>
        {name}: {number}
        <button
          className={s.button}
          onClick={() => removeContact(id)}
          type="button"
        >
          Delete
        </button>
      </li>
    );
  });
};

export default ContactItem;
