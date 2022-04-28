const { ethers } = require("hardhat");


module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await getChainId();
  await deploy("Ballot", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [[
      ethers.utils.formatBytes32String('Jerry'),
      ethers.utils.formatBytes32String('Tom'),
      ethers.utils.formatBytes32String('Kelly'),
      ethers.utils.formatBytes32String('Mark'),
    ]],
    log: true,
    waitConfirmations: 5,
  });
  await ethers.getContract("Ballot", deployer);
};
module.exports.tags = ["Ballot"];
