/** @format */

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
dotenv.config();

const mainNet_provider_url = process.env.MAINNET_PROVIDER_URL!;
const testNet_provider_url = process.env.TESTNET_PROVIDER_URL!;
const private_key = process.env.PRIVATE_KEY!;
console.log(mainNet_provider_url);
console.log(testNet_provider_url);
console.log(private_key);

const config: HardhatUserConfig = {
	solidity: {
		compilers: [{ version: '0.8.10' }, { version: '0.8.13' }],
	},
	networks: {
		hardhat: {
			forking: {
				url: mainNet_provider_url,
			},
		},
		testnet: {
			url: testNet_provider_url,
			chainId: 97,
			accounts: [private_key],
		},
		mainnet: {
			url: mainNet_provider_url,
			chainId: 56,
			accounts: [private_key],
		},
	},
};

export default config;
