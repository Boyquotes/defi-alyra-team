// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract fUSDT is ERC20 {
    constructor() ERC20("fake Tether USD", "fUSDT") {}

    /** @dev mintable token without restriction */
    function mint(address _account, uint _amount) external {
        _mint(_account, _amount);
    }
} 