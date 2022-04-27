const hre = require("hardhat");

async function main() {
    const Vote = await hre.ethers.getContractFactory("Ballot");
    const vote = await Vote.deploy([
        hre.ethers.utils.formatBytes32String('Jerry'),
        hre.ethers.utils.formatBytes32String('Tom'),
        hre.ethers.utils.formatBytes32String('Kelly'),
        hre.ethers.utils.formatBytes32String('Mark'),
    ]);
    await vote.deployed();
    console.log("Vote deployed to:", vote.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
