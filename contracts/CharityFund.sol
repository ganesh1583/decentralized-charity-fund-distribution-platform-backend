// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CharityFund {

    address public owner;
    uint public threshold = 0.1 ether;
    uint public totalAmount;

    // Event to log the deposit and transfer actions
    event FundDeposited(address indexed donor, uint amount);
    event FundsTransferred(address indexed recipient, uint amount);

    // Constructor to set the threshold value
    constructor() {
        owner = msg.sender; // The contract creator becomes the owner
        totalAmount = 0; // Initial fund is 0
    }

    // Function to deposit funds into the contract
    function deposit() public payable {
        require(msg.value > 0, "Must send some Ether");
        
        totalAmount += msg.value; // Add the sent amount to the total funds
        
        emit FundDeposited(msg.sender, msg.value); // Log the deposit event
        
        // If the total amount exceeds or equals the threshold, transfer the funds
        if (totalAmount >= threshold) {
            transferFunds();
        }
    }

    // Function to transfer funds to the owner (considered as NGO's address for now)
    function transferFunds() private {
        address payable recipient = payable(owner); // The recipient address (currently the owner's address)
        
        uint amountToTransfer = totalAmount;
        totalAmount = 0; // Reset the totalAmount after the transfer
        
        // Transfer the funds to the recipient
        (bool sent, ) = recipient.call{value: amountToTransfer}("");
        require(sent, "Failed to send Ether");

        emit FundsTransferred(recipient, amountToTransfer); // Log the fund transfer event
    }

    // Function to get the current balance of the contract
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

}
