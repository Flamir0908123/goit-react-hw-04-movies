import s from './Filter.module.css';

const Filter = ({ onChange, value }) => {
  return (
    <>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          name="filter"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default Filter;
