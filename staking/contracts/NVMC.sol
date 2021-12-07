// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NVMC is ERC20, Ownable {
    mapping(address => bool) public chiefs;

    modifier onlyChief() {
        require(owner() == _msgSender() || chiefs[msg.sender]);
        _;
    }

    constructor() ERC20("NVMCS Stake Token", "NVMCS") {}

    function getChief(address _newChief) public view returns (bool){
        return chiefs[_newChief];
    }

    function setChief(address _newChief) public onlyOwner {
        require (chiefs[_newChief] == false);
        chiefs[_newChief] = true;
    }

    function removeChief(address _newChief) public onlyOwner {
        require (chiefs[_newChief] == true);
        chiefs[_newChief] = false;
    }

    /** @dev make the token mintable for only masterchief and staking contract */
    function mint(address _account, uint _amount) external onlyChief {
        _mint(_account, _amount);
    }
}
