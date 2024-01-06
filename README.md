# FlashLoan Smart Contract 🚀

Welcome to the FlashLoan smart contract repository! This contract facilitates flash loans on the Ethereum blockchain, allowing users to borrow assets temporarily without the need for collateral.

## Features 🚀

- **Flash Loan Request:** Users can initiate flash loan requests by specifying the token path, amounts, and other parameters.

- **Flash Loan Callback:** The contract includes a callback function to handle the flash loan execution, including multiple swaps and the repayment of the loan.

## Tech Stacks 🛠️

- **Typescript:** Used for developing the backend logic and interactions of the FlashLoan smart contract. TypeScript brings strong typing to the JavaScript language, enhancing code readability and maintainability.

- **Solidity:** Utilized for developing the smart contract that runs on the Ethereum Virtual Machine (EVM). Solidity is a purpose-built language for smart contract development, providing security features and compatibility with the Ethereum blockchain.

- **Hardhat:** Employed as the development environment and testing framework. Hardhat streamlines the smart contract development process by offering tools for compiling, deploying, and testing contracts, making the development workflow efficient and reliable.

It is designed to provide an efficient and secure implementation of flash loans on the Ethereum blockchain. Users can initiate flash loans, borrowing assets for a single transaction.

## Getting Started 🏁

### Deployment

1. Deploy the contract to the Ethereum blockchain using Hardhat.
2. Specify the `token0` and `token1` addresses, as well as the desired fee, during contract deployment.
3. The contract initializes the Uniswap V3 pool based on the provided parameters.

### Flash Loan Request

Users can interact with the contract by calling the `flashLoanRequest` function, providing the required parameters for the flash loan:

- `_path`: The token path for the flash loan.
- `_amount0` and `_amount1`: The amounts to be borrowed for `token0` and `token1`, respectively.
- `_fee`: The Uniswap V3 pool fee.
- `_exchRoute`: An array representing the swapping route for multiple exchanges before repaying the loan.

## Testing 🧪

The smart contract has been thoroughly tested using Hardhat to ensure the reliability and functionality of flash loans. The tests cover various scenarios, including proper handling of flash loan requests and callback execution.

### Running Tests Locally

1. Deploy the contract to a local Ethereum network or testnet using Hardhat.
2. Interact with the contract using a testing framework or tools like Remix IDE.
3. Verify that flash loans are executed correctly and that the callback handles repayments and swaps as intended.

## Contributing 🤝

Contributions to the development and improvement of the FlashLoan smart contract are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

## Acknowledgments 🙏

Special thanks to the authors of the libraries and interfaces used in this contract, including Uniswap V3 and OpenZeppelin.

Happy coding! 🚀
