import React from 'react';
import useSwap from '../hooks/useSwap';
import styles from './SwapCard.module.css';
import { ReactComponent as UniswapLogo } from '../assets/icons/uniswap-logo.svg';
import { ReactComponent as EthereumLogo } from '../assets/icons/ethereum-logo.svg';
import { useAccount, useBalance } from 'wagmi';
import Spinner from './Spinner';
import Button from './Button';

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const SwapCard = () => {
  const [amount, setAmount] = React.useState(0);
  const [quote, setQuote] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const { swap, getQuote } = useSwap();
  const { address } = useAccount();
  const { data: ETHBalance } = useBalance({
    addressOrName: address,
    watch: true,
  });
  const { data: UNIBalance } = useBalance({
    addressOrName: address,
    token: UNI_ADDRESS,
    watch: true,
  });

  const onChangeAmountInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmount(parseFloat(event.target.value));
    const quote = await getQuote(parseFloat(event.target.value));
    setQuote(quote);
  };

  const onClickSwapButton = async () => {
    setIsLoading(true);
    const txn = await swap(amount);
    await txn.wait();
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.swapCard}>
        <div>
          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              type="text"
              placeholder="Amount in"
              disabled={address ? false : true}
              onChange={onChangeAmountInput}
            />
            <div className={styles.tokenContainer}>
              <EthereumLogo className={styles.tokenIcon} />
              <p className={styles.tokenSymbol}>ETH</p>
            </div>
          </div>
          <p className={styles.balance}>Balance: {ETHBalance?.formatted}</p>
        </div>
        <div>
          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              type="text"
              placeholder="Amount out"
              disabled
              value={quote === 0 ? '' : quote}
            />
            <div className={styles.tokenContainer}>
              <UniswapLogo className={styles.tokenIcon} />
              <p className={styles.tokenSymbol}>UNI</p>
            </div>
          </div>
          <p className={styles.balance}>Balance: {UNIBalance?.formatted}</p>
        </div>
        <Button disabled={address ? false : true} onClick={onClickSwapButton}>
          Swap
        </Button>
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default SwapCard;
