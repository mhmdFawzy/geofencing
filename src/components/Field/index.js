import { forwardRef } from 'react';
import styles from './Field.module.css';
import PropTypes from 'prop-types';

const Field = forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <input ref={ref} type={type} className={styles.input} />
    </div>
  );
});
Field.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
Field.displayName = 'Field';

export default Field;
