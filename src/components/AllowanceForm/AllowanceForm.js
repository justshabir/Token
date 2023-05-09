import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./AllowanceForm.module.css";

const AllowanceForm = ({ account, provider }) => {
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");

  const handleAllowance = async (event) => {
    event.preventDefault();

    try {
      const contract = new ethers.Contract(
        // Enter the address of your token contract
        "0xFF5893C9F8DD7A142386cD75a284bCcc7742D502",
        // Enter the ABI of your token contract
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
          "function allowance(address owner, address spender) public view returns (uint256)",
        ],
        provider.getSigner()
      );

      const allowanceAmount = ethers.utils.parseEther(amount);

      const tx = await contract.approve(spender, allowanceAmount);
      await tx.wait();

      const allowance = await contract.allowance(account, spender);
      setAmount(ethers.utils.formatEther(allowance));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Allowance Form</h3>
      <form className={styles.form} onSubmit={handleAllowance}>
        <div className={styles.formGroup}>
          <label htmlFor="spender" className={styles.label}>
            Spender Address:
          </label>
          <input
            type="text"
            id="spender"
            className={styles.input}
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            step="0.000000000000000001"
            className={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Approve
        </button>
      </form>
    </div>
  );
};

export default AllowanceForm;
