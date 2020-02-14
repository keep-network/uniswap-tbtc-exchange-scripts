# uniswap-tbtc-exchange-scripts

Uniswap ETH-TBTC exchange is initialized on Ropsten: https://ropsten.etherscan.io/address/0x242e084657f5cdcf745c03684aaec6e9b0bb85c5

### before using:
1) fill out `private.json`
   - Address to sign transactions with.
   - That address's private key (to actually sign).
   - Connection url (eg: infura + project ID).

### How to use:

**getExchange.js**
Check if an exchange already exists for the given factory and return it(ropsten and TBTC hardcoded, 
but can easily change that)

**getBalance**
returns TBTC and ETH balance of an exchange (0x242e084657f5cdcf745c03684aaec6e9b0bb85c5 hardcoded, but can change):
```
ETH:  2009920298804482
TBTC: 1989901192341793
```
**createExchange.js:**

Creates a new exchange from the factory. Will revert if the factory has already initialized the exchange.
for a list of deployed factories, see [uniswap sdk](https://github.com/Uniswap/uniswap-sdk/blob/master/src/constants/index.ts):
```
export const FACTORY_ADDRESS: { [key: number]: string } = {
  [SUPPORTED_CHAIN_ID.Mainnet]: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  [SUPPORTED_CHAIN_ID.Ropsten]: '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351',
  [SUPPORTED_CHAIN_ID.Rinkeby]: '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36',
  [SUPPORTED_CHAIN_ID.Kovan]: '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30'
}
```

**approve.js**

Approves TBTC to send to the exchange contract. This allows `addLiquidity.js` to work

**addLiquidity.js**

Sends approved TBTC along with an equivalent amount of ETH to the exchange/pool.

**Swap**

Buys TBTC with ETH from the exchange. beware the low liquidity slippage beast. 
