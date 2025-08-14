// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

error NotOwner();
error InsuffientBalance();
error WithdrawCallFailed();

contract DonateContract {
    mapping(address donor => uint amountedDonates) public addressToDonate;

    uint public totalDonations;

    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender;
    }

    event NewDonation(address indexed donor, string name, string message, uint256 amount);

    function donate(string memory _name, string memory _message) public payable {
        require(msg.value > 0, InsuffientBalance());

        addressToDonate[msg.sender] += msg.value;

        totalDonations += msg.value;

        emit NewDonation(msg.sender, _name, _message, msg.value);
    }

    function withdraw() public onlyOwner {
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, WithdrawCallFailed());

    }

    modifier onlyOwner() {
      if(msg.sender != i_owner) { revert NotOwner(); }
      _;
    }

}