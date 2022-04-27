pragma solidity ^0.8.0;

contract Token {
    address public minter;
    mapping( address => uint) balances;

    event Sent(address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        if (msg.sender != minter) return;
        balances[receiver] += amount;
    }

    function send(address receiver , uint amount) public {
        if(balances[msg.sender] <= amount) return;

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}