import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import tokenContractArtifact from "./build/contracts/TokenContract.json";
import Header from "./components/Header/Header.js";
import TokenDashboard from "./components/TokenDashboard/TokenDashboard.js";
import TransferForm from "./components/TransferForm/TransferForm.js";
import ApprovalForm from "./components/ApprovalForm/ApprovalForm.js";
import AllowanceForm from "./components/AllowanceForm/AllowanceForm.js";
import MintForm from "./components/MintForm/MintForm.js";
import BurnForm from "./components/BurnForm/BurnForm.js";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [tokenContract, setTokenContract] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      try {
        // Request access to the user's MetaMask account
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Set the user's account in state
        setAccount(account);

        // Set the provider in state
        setProvider(new ethers.providers.Web3Provider(window.ethereum));

        // Create an instance of the token contract
        const signer = provider.getSigner();
        const contractAddress = tokenContractArtifact.networks[1].address;
        const tokenContract = new ethers.Contract(
          contractAddress,
          tokenContractArtifact.abi,
          signer
        );
        setTokenContract(tokenContract);
      } catch (error) {
        console.log(error);
      }
    };

    getAccount();
  }, []);

  return (
    <div className="App">
      <div className="header-container">
        <Header
          name={tokenContractArtifact.name}
          symbol={tokenContractArtifact.symbol}
          totalSupply={tokenContract && tokenContract.totalSupply()}
        />
      </div>
      <div className="dashboard-container">
        <TokenDashboard
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
      <div className="transfer-form-container">
        <TransferForm
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
      <div className="approval-form-container">
        <ApprovalForm
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
      <div className="allowance-form-container">
        <AllowanceForm
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
      <div className="mint-form-container">
        <MintForm
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
      <div className="burn-form-container">
        <BurnForm
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      </div>
    </div>
  );
}

export default App;
