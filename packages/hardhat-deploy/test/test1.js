const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('test1',function () {
    it('should return the success info', async ()=>{
        const Token = await ethers.getContractFactory('Token');
        const token = await Token.deploy();
        await token.deployed();
        console.log(token.address);
    })
})