/** @format */
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { abi as abiFlashoan } from '../artifacts/contracts/FlashLoan.sol/FlashLoan.json';

const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const CAKE = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82';

describe('Binance FlashLoan PanCake swap V3', () => {
	describe('Deployment and Testing', () => {
		it('Deploys and performs Flash loan arbitrage', async () => {
			const FlashLoan = await ethers.getContractFactory('FlashLoan');
			let flashLoan = await FlashLoan.deploy(WBNB, BUSD, 500);

			await flashLoan.deployed();
			console.log('Flashloan contract address: \t', flashLoan.address);

			//create Signer
			const [signer] = await ethers.getSigners();

			// Initialize FlashLoan params
			const amountBorrow = ethers.utils.parseUnits('30', 18);
			const tokenPath = [CAKE, WBNB];
			const exchangeRoute = [1, 0, 0];
			const feeV3 = 500;

			// Connect to the flashloan contract
			const contractDeployedFlashload = new ethers.Contract(
				flashLoan.address,
				abiFlashoan,
				signer
			);

			// Call flash Loan function
			const txtFlashLoan = await contractDeployedFlashload.flashLoanRequest(
				tokenPath,
				0,
				amountBorrow,
				feeV3,
				exchangeRoute
			);

			// Show Results
			const txFlashLoanReceipt = await txtFlashLoan.wait();
			expect(txFlashLoanReceipt.status).to.eql(1);
		});
	});
});
