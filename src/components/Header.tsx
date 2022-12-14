import React from 'react';
import { chainId, useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Button from './Button';
import styles from './Header.module.css';

const Header = () => {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    chainId: chainId.goerli,
  });

  return (
    <header className={styles.header}>
      {address ? (
        <p>Connected to: {address}</p>
      ) : (
        <Button onClick={connect}>Connect wallet</Button>
      )}
    </header>
  );
};

export default Header;
