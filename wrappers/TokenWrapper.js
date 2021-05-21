const Web3  = require('web3');

module.exports = TokenWrapper = (contractAddress, contractAbi, provider, avgBlocksHour) => {
    
    const createW3Instance = () => {
        return new Web3(provider);
    };

    let web3 = createW3Instance();

    const createContractInstance = () => {
        return new web3.eth.Contract(contractAbi, contractAddress);
    };
    
    let contract = createContractInstance();

    let transactionRecords = [];
    let blocksHour = avgBlocksHour;

    // Gets rid of any transaction records that are over a day old
    const removeOldTransactions = () => {
        if (transactionRecords.length == 0){ return }
        while (transactionRecords[0].TimeStamp - transactionRecords[transactionRecords.length-1] > 86400000) { // 86400000 = 24 hours in ms
            transactionRecords.shift();
        }
    }

    const getLatestTransactionStats = (blocksHour) => {
        new Promise(resolve => {
            web3.eth.getBlockNumber().then(blockNo => {
                let fromBlock = 0;
                if (transactionRecords.length > 0) { 
                // We already have some transfer data, want transfers since the last block we checked
                    fromBlock = transactionRecords[(transactionRecords.length-1)].BlockNumber;
                } else {
                // We have no transfers, we want all blocks for aprox. the past hour
                    fromBlock = blockNo - blocksHour;
                }
                contract.getPastEvents("Transfer", {
                    fromBlock: fromBlock
                }).then((logs) => {
                    let total = 0;

                    for (const log of logs) {
                        total += parseInt(log.returnValues.value);
                    }

                    let fees = total / 100 * 5;
                    resolve({total, fees, blockNo});
                });
            });
        }).then(stats => {
            transactionRecords.push({
                "Total": stats.total/1e9,
                "Fees": stats.fees/1e9,
                "BlockNumber": stats.blockNo,
                "TimeStamp": Date.now()
            })
        });
        removeOldTransactions();
    }

    // Run the getLatestTransactionStats for the past hour of blocks, every hour from init. 3.6*1e6
    getLatestTransactionStats(blocksHour);
    setInterval(() => getLatestTransactionStats(blocksHour), 1.3*1e6)

    const getTransactionStats = () => {
        getLatestTransactionStats(blocksHour);
        let totalTransacted = 0;
        let totalFees = 0;
        transactionRecords.forEach(record => {
            totalTransacted += record.Total;
            totalFees += record.Fees
        });
        return {totalTransacted, totalFees};
    }

    return {
        getTransactionStats: getTransactionStats
    }
};
