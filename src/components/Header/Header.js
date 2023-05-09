import React from "react";
import styles from "./Header.module.css";

function Header({ name, symbol, totalSupply }) {
  return (
    <header className={styles.header}>
      <h1>{name}</h1>
      {symbol && <p>Symbol: {symbol}</p>}
      {totalSupply && <p>Total supply: {totalSupply}</p>}
    </header>
  );
}

export default Header;
