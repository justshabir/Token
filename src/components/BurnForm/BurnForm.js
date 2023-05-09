import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./BurnForm.module.css";

const BurnForm = ({ account, contract }) => {
  const [amount, setAmount] = useState("");

  const handleBurn = async (event) => {
    event.preventDefault();

    try {
      // Convert the input amount to BigNumber
      const value = ethers.utils.parseEther(amount);

      // Call the burn function on the contract
      const tx = await contract.burn(value);
      await tx.wait();

      // Clear the input field
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.burnForm} onSubmit={handleBurn}>
      <h3 className={styles.heading}>Burn Tokens</h3>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="burnAmount">
          Amount to Burn:
        </label>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="number"
            id="burnAmount"
            min="0"
            step="0.0001"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
          <span className={styles.inputAddon}>ETH</span>
        </div>
      </div>
      <button className={styles.button} type="submit">
        Burn
      </button>
    </form>
  );
};

export default BurnForm;
