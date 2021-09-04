import PropTypes from "prop-types";
import s from "./Section.module.css";

const Section = (props) => {
  return (
    <section>
      <h2 className={s.title}>{props.title}</h2>
      {props.children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;
