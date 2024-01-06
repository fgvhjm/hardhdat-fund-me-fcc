const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChain } = require("../../helper-hadhat-config")
// const { console } = require("hardhat/console.sol")
!developmentChain.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let mockV3Aggregator
          let deployer
          // const sendValue = ethers.units.parseEther("1")
          const sendValue = ethers.parseEther("1")

          beforeEach(async function () {
              const accounts = await ethers.getSigners()
              deployer = accounts[0].address

              //   await deployments.fixture(["all"])

              const fundMeDeployment = await deployments.get("FundMe")
              //   console.log("yahana se fund me suru")
              //   console.log(fundMeDeployment)
              //   console.log("yhan akhatam")

              fundMe = await ethers.getContractAt(
                  "FundMe",
                  fundMeDeployment.address
              )
              //   console.log(fundMe)

              const mockV3AggregatorDeployment = await deployments.get(
                  "MockV3Aggregator"
              )
              mockV3Aggregator = await ethers.getContractAt(
                  mockV3AggregatorDeployment.abi,
                  mockV3AggregatorDeployment.address
              )
          })

          describe("constructor", async function () {
              it("sets the aggregator addresses correctly", async function () {
                  const response = await fundMe.priceFeed()
                  //   console.log(response)
                  assert.equal(response, mockV3Aggregator.target)
              })
          })

          describe("fund", async function () {
              it("fails if you don't send enough ETH", async function () {
                  await fundMe.fund({ value: sendValue })
              })
              console.log("oni incha")
              it("updates the amound funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.addressToAmountFunded(deployer)
                  assert.equal(response.toString(), sendValue.toString())
              })

              //   it("adds funder to array of funders", async () => {
              //       await fundMe.fund({ value: sendValue })
              //       const response = await fundMe.getFunder(0)
              //       assert.equal(response, deployer)
              //   })
          })
          describe("withdraws amount", async () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })
              //arrange

              it("check", async () => {
                  // use yarn hardhat test --grep 'check' for only this section check
                  const startingFundMeBalance =
                      await ethers.provider.getBalance(fundMe.target)
                  const startingDeployerBalance =
                      await ethers.provider.getBalance(deployer)
                  console.log(startingDeployerBalance)
                  console.log(startingFundMeBalance)

                  //act
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)

                  const endingFundBal = await ethers.provider.getBalance(
                      fundMe.target
                  )
                  const endingFundDeployer = await ethers.provider.getBalance(
                      deployer
                  )
                  const gasCost = 59541584384236

                  //assert
                  assert.equal(endingFundBal, 0)
                  assert.equal(
                      startingFundMeBalance + startingDeployerBalance,
                      endingFundDeployer + BigInt(gasCost)
                  )
                  console.log(startingFundMeBalance + startingDeployerBalance)
                  console.log(endingFundDeployer + BigInt(gasCost))
              })
              it("modifier only owner check", async () => {
                  // arrange
                  const account = await ethers.getSigners()
                  const attacker = account[8] //notice how we  dont use account[4].address
                  //rather we connect the whole account
                  // act
                  const connectedAttacker = await fundMe.connect(attacker)
                  console.log(fundMe)
                  //assert
                  await expect(connectedAttacker.withdraw()).to.be.reverted
                  //   console.log(await connectedAttacker.withdraw())
              })
          })
      })
/*gas optimizing
all the state or global variable are stored according to given below link
https://youtu.be/gyMwXuJrbJQ?t=42526
https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html
funwith storage
*/
