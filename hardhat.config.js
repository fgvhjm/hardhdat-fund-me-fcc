require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
// require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-ethers")

// require("@nomiclabs/hardhat-etherscan")

module.exports = {
    // solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/OhkA-EwndqA8EV8egpjPiKHC4LLXNNH0",
            accounts: [
                "a0d8183ec81829921c81c7a8e697399521892d4ac221c2b3cc660ce6cdecff45",
            ],
            chainId: 11155111, // we bring this fromchainlist.org
        },
    },
    // defaultNetwork: "hardhat",
    // networks: {
    //     sepolia: {
    //         url: SEPOLIA_RPC_URL,
    //         accounts: [PRIVATE_KEY],
    //         chainId: 11155111,
    //     },
    // },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: process.env.COINMARKET_CAP_API,
        token: "MATIC",
    },
}
