import React, { useState } from "react";
import { ethers } from "ethers";
import tokenContractArtifact from "./TokenContract.json";
import styles from "./ApprovalForm.module.css";

const ApprovalForm = ({ account, provider }) => {
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const contract = new ethers.Contract(
        tokenContractArtifact.networks["11155111"].address,
        tokenContractArtifact.abi,
        provider.getSigner()
      );
      const tx = await contract.approve(spender, amount);
      await tx.wait();
      console.log("Approval successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.ApprovalForm} onSubmit={handleApprove}>
      <h3>Approve Spending</h3>
      <label>
        Spender:
        <input
          type="text"
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button type="submit">Approve</button>
    </form>
  );
};

export default ApprovalForm;
