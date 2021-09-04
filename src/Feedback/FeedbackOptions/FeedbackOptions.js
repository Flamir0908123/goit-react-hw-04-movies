import PropTypes from "prop-types";
import s from "./FeedbackOptions.module.css";

const FeedbackOptions = ({ options, onFeedbackButtonClick }) => {
  return (
    <button
      className={s.button}
      type="button"
      name={options}
      onClick={onFeedbackButtonClick}
    >
      {options}
    </button>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.string.isRequired,
};

export default FeedbackOptions;
