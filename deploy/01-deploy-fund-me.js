//import
//main fucntion
//calling of main fucntion
// function deployFunc(hre) {
//     console.log("hi")
//     hre.getNamedAccounts()
//     hre.deployments.deploy
// }
// module.exports.default = deployFunc
// or we can use
// module.exports=async (hre) =>{
//     const {getNamedAccounts,deployments}=hre
//     //hre.getNamedAcoounts
//     //hre.deployments
// }

const { network } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hadhat-config")
const { lazyFunction } = require("hardhat/plugins")
//or we can use
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chain id is z use address a
    //if chain id is x use address b
    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        log("i m in")
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")

        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contarct doesnt exist we deploy a minimal version
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //put price feed address
        log: true,
    })
}
module.exports.tags = ["all", "funme"]
