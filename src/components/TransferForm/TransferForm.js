import React, { useState } from "react";
import { ethers } from "ethers";
import tokenContractArtifact from "./TokenContract.json";
import styles from "./TransferForm.module.css";

const TransferForm = ({ account, provider }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const contract = new ethers.Contract(
        tokenContractArtifact.networks["11155111"].address,
        tokenContractArtifact.abi,
        provider.getSigner()
      );
      const tx = await contract.transfer(to, amount);
      await tx.wait();
      console.log("Transfer successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleTransfer}>
      <h3 className={styles.heading}>Transfer Tokens</h3>
      <div className={styles.formGroup}>
        <label className={styles.label}>Recipient Address</label>
        <input
          className={styles.input}
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Amount</label>
        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button className={styles.button} type="submit">
        Transfer
      </button>
    </form>
  );
};

export default TransferForm;
