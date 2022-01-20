const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compile = require("./compile");
const abi = JSON.parse(compile).contracts["Lottery.sol"].Lottery.abi;
const evm = JSON.parse(compile).contracts["Lottery.sol"].Lottery.evm;

const provider = new HDWalletProvider(
  "absurd sign twelve essay green miss category claw volume dirt tragic search",
  "https://rinkeby.infura.io/v3/d68e27fed1074986b85ddffc9f1074b1"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
