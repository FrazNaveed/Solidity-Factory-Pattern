import { ethers } from "ethers";
import { useState, useEffect } from "react";
import "./App.css";
import abi from "./abi.json";

function App() {
  const contractAddress = "0x346d94F7E616c2Ae2977075A5Dd329Abb2b4A7A8";

  const [walletAddress, setWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [myTokens, setMyTokens] = useState([]);


  const connectWallet = async()=>{
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setWalletAddress(...accounts);
  }

  const createToken = async() => {
    const { ethereum } = window;

    if (typeof window.ethereum == "undefined") {
      alert("Connect Metamask Wallet");
    } else {
  
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      await contract.createToken(
        walletAddress,
        (supply * Math.pow(10, 18)).toString(),
        name,
        symbol
      );
    }
  };

  const getTokens = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tokens = await contract.getAllAddresses(walletAddress);
    setMyTokens(tokens);
    console.log(myTokens);
  };

  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>You are connected: {walletAddress}</p>
      <h2>Create Your Own ERC20 Token At 1 Click on BSC testnet</h2>

      <h3>
        An intended demonstration towards{" "}
        <a
          href="https://betterprogramming.pub/learn-solidity-the-factory-pattern-75d11c3e7d29"
          style={{ color: "red" }}
        >
          <u>Solidity Factory Pattern</u>
        </a>
      </h3>

      <div className="boxed">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Symbol"
          onChange={(e) => {
            setSymbol(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Total Supply"
          onChange={(e) => {
            setSupply(e.target.value);
          }}
        />
      </div>

      <button onClick={createToken}>Create Token</button>
      <button onClick={getTokens}>Get Your Tokens</button>

      {
        myTokens.map((values)=><p>{values}</p>)
      }    
      
    </div>
  );
}

export default App;
