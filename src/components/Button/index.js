import PropTypes from 'prop-types';

import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, handleClick, ...props }) => {
  return (
    <button className={styles.button} type="submit" onClick={handleClick} {...props}>
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Button;
