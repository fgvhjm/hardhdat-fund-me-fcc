const { network } = require("hardhat")
const { developmentChain } = require("../helper-hadhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const chainId = network.config.chainId

    if (chainId == 31337) {
        log("local network detetcted deploying mocks")
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [8, 200000000000],
        })
        log("mocks deployed")
        log("----------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
// this tags means when we write deploy --tagsmocks it will
//run only run this,odule
