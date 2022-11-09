import React from 'react';
import styles from './Button.module.css';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ onClick, children, disabled }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
