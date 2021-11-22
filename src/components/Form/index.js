import Button from './../../components/Button';
import React from 'react';
import styles from './Form.module.css';
import PropTypes from 'prop-types';

const Form = ({ children, onSubmitFunc, values }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        data[key] = values[key].current.value;
      }
    }
    onSubmitFunc(data);
  };
  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {children}
        <div>
          <Button text={'submit'} handleClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmitFunc: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
export default Form;
