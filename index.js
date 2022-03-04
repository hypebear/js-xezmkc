import Web3Modal from 'web3modal';
import WalletConnectProvider from 'web3-provider';
import WalletLink from 'wallet-sdk';
let ABI =
  '[{"inputs":[{"internalType":"address","name":"_singleton","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"}]';
let ADDRESS = '0xfAb5A68349a7A3a6107B9DA4e1631e7366AcaB91';
const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '8d9b36bd3fa642b0b28777c2684df958',
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: 'Mint',
      infuraId: '8d9b36bd3fa642b0b28777c2684df958',
      rpc: 'https://mainnet.infura.io/v3/8d9b36bd3fa642b0b28777c2684df958',
      chainId: 1,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  theme: 'dark',
  cacheProvider: true,
  providerOptions,
});

async function connectwallet() {
  var provider = await web3Modal.connect();
  var web3 = new Web3(provider);
  await window.ethereum.send('eth_requestAccounts');
  var accounts = await web3.eth.getAccounts();
  account = accounts[0];
  document.getElementById('wallet-address').textContent = account;
  contract = new web3.eth.Contract(ABI, ADDRESS);
}

async function mint() {
  var _mintAmount = Number(document.querySelector('[name=amount]').value);
  var mintRate = Number(await contract.methods.cost().call());
  var totalAmount = mintRate * _mintAmount;
  contract
    .mint(account, _mintAmount)
    .send({ from: account, value: String(totalAmount) });
}
