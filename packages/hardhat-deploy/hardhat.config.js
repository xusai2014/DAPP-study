const fs = require("fs");

require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
require('hardhat-deploy');

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");




// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KhDHwLUuk5zih9AoojK8f1rlPkthbeRJ";
// // Replace this private key with your Ropsten account private key
// // To export your private key from Metamask, open Metamask and
// // go to Account Details > Export Private Key
// // Be aware of NEVER putting real Ether into testing accounts
// const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
    );
  }
  return "";
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version:  "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    hardhat: {
      saveDeployments: true,
      accounts: {
        mnemonic: mnemonic(),
      },
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/9AVIKwlSvR6p8skmu8MJ38IcWxTUicl3`,
        blockNumber: 11095000
      },
      chainId: 31337,
      from: '',
      gas: "auto",
      gasPrice: "auto",
      mining: {
        auto: false,
        interval: 5000
      },
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      saveDeployments: true,
      accounts: {
        mnemonic: mnemonic(),
      }
    }
  },
  abiExporter: {
    path: "../next-app/contracts/abi",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },
  ovm: {
    solcVersion: "0.7.6",
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    }
  },
  mocha: {
    timeout: 20000
  },

};
