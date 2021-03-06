// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.16;

contract Test_Token_1{

    mapping (address => uint) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    string public symbol;
    string public name;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    event Transfer (address indexed from, address indexed to, uint amount);
    event Approval (address indexed tokenOwner, address indexed spender, uint tokens);

    constructor(string memory _name,string memory _symbol,uint nbTokens,address owner) public {
        name=_name;
        symbol=_symbol;
        mint(owner,nbTokens*10**decimals);
    }

    function mint(address receiver, uint amount) internal {
        balanceOf[receiver] += amount;
        totalSupply += amount;
        
        emit Transfer(address(0), receiver, amount);
    }
    
    function transfer(address receiver, uint amount) public {
        require(balanceOf[msg.sender]>=amount, "Insufficient balance.");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[receiver] += amount;
        
        emit Transfer(msg.sender, receiver, amount);
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowance[msg.sender][spender] = tokens;
        
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public returns (bool success) {
        require(allowance[from][msg.sender]>= amount, "You aren't allowed to spend this amount");
        require(balanceOf[from]>=amount, "Insufficient balance");
        
        allowance[from][msg.sender] -= amount;
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
}
