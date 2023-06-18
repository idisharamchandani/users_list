import React from 'react';
import styles from './loader.module.css'; // Import the CSS module

const Loader = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
