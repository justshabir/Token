import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenContractArtifact from "./TokenContract.json";
import styles from "./TokenDashboard.module.css";

const TokenDashboard = ({ account, provider }) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        // Create a new contract instance
        const contract = new ethers.Contract(
          tokenContractArtifact.networks["11155111"].address,
          tokenContractArtifact.abi,
          provider.getSigner()
        );

        // Fetch token information
        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        const balance = await contract.balanceOf(account);

        // Update state with token information
        setTokenName(name);
        setTokenSymbol(symbol);
        setTotalSupply(supply.toString());
        setBalance(balance.toString());
      } catch (error) {
        console.log(error);
      }
    };

    if (account && provider) {
      getTokenInfo();
    }
  }, [account, provider]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{tokenName}</h2>
      <p className={styles.label}>Symbol:</p>
      <p className={styles.value}>{tokenSymbol}</p>
      <p className={styles.label}>Total supply:</p>
      <p className={styles.value}>{totalSupply}</p>
      <p className={styles.label}>Balance:</p>
      <p className={styles.value}>{balance}</p>
    </div>
  );
};

export default TokenDashboard;
