import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./MintForm.module.css";

const MintForm = ({ contract, setTotalSupply }) => {
  const [amount, setAmount] = useState("");

  const handleMint = async (event) => {
    event.preventDefault();
    try {
      const tx = await contract.mint(amount);
      await tx.wait();
      const totalSupply = await contract.totalSupply();
      setTotalSupply(totalSupply.toString());
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <form className={styles.mintForm} onSubmit={handleMint}>
      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.label}>
          Amount to Mint
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className={styles.input}
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" className={styles.button}>
        Mint
      </button>
    </form>
  );
};

export default MintForm;
