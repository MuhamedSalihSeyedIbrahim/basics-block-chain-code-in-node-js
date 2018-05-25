const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data).toString());
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'Genesis', 0);
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (var i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (JSON.stringify(currentBlock.hash) !== JSON.stringify(currentBlock.calculateHash())) {
                console.log(JSON.stringify(currentBlock.hash, null, 5));
                console.log(JSON.stringify(currentBlock.calculateHash(), null, 5));

                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;

            }
        }
        return true;
    }
}

let sCoin = new BlockChain();
sCoin.addBlock(new Block(0, '12/3/32', { data: 60 }));
sCoin.addBlock(new Block(0, '12/3/31', { data: 600 }));
console.log(JSON.stringify(sCoin, null, 5));

console.log("Is Chain Valid", sCoin.isChainValid());
sCoin.chain[1].data = { "data": 500 };

console.log("Is Chain Valid", sCoin.isChainValid());