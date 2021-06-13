# recharge-api

Api for [r3charge.finance](https://recharge.finance/)

## Endpoints:

`/circulation/{chain}` 
- Retrieves the amount of tokens in circulation on the specified chain (eth | bsc). 
- Append `?format=text` to retrieve the circulation in plain-text format 

`/transactions/{chain}` 
- Retrieves the amount of tokens transferred on the specified chain (eth | bsc) & the distributed fees in the past 24 hours. 
- Append `?format=text` to retrieve the circulation in plain-text format 
- Server must be running for 24 hours to have accurate transactions, under 24 hours and the totals will be since the server was started

## Requires:

- Node

# Use:

`npm install && npm start` 


