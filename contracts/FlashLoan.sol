// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import { IUniswapV2Router02 } from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import { ISwapRouter } from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import { IUniswapV3Pool } from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { TransferHelper } from "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FlashLoan {
  IERC20 private immutable token0;
  IERC20 private immutable token1;
  IUniswapV3Pool private immutable pool;

  address private constant deployer =0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9;

  constructor(address _token0, address _token1, uint24 _fee){
    token0 = IERC20(_token0);
    token1 = IERC20(_token1);
    pool = IUniswapV3Pool(getPool(_token0, _token1, _fee));
    console.log("The pool address: \t", address(pool));
  }

  function getPool(address _token0, address _token1, uint24 _fee) public pure returns(address ){
    PoolAddress.PoolKey memory poolKey = PoolAddress.getPoolKey(_token0, _token1, _fee);
    return PoolAddress.computeAddress(deployer, poolKey);
  }
}

library PoolAddress {
  
  bytes32 internal constant POOL_INIT_CODE_HASH = 0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2;

  struct PoolKey{
    address token0;
    address token1;
    uint24 fee;
  }

  function getPoolKey(
    address tokenA,
    address tokenB,
    uint24 fee
  ) internal pure returns(PoolKey memory){
    if(tokenA > tokenB) (tokenA, tokenB) = (tokenB, tokenA);
    return PoolKey({
      token0 : tokenA,
      token1 : tokenB,
      fee    : fee
    });
  }

  function computeAddress(address deployer, PoolKey memory key) internal pure returns (address pool) {
    require(key.token0 < key.token1);
    pool = address(
        uint160(uint(
          keccak256(
            abi.encodePacked(
              hex'ff',
              deployer,
              keccak256(abi.encode(key.token0, key.token1, key.fee)),
              POOL_INIT_CODE_HASH
            )
          )
        )
      )
    );
  }
}