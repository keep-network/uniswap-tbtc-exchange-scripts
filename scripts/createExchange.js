const presets = require('../presets')
const Web3 = require("web3");
const Tx = require('ethereumjs-tx').Transaction

//init web3
const provider = new Web3.providers.HttpProvider(presets.url)
const web3 = new Web3(provider);

const TBTCToken = '0x083f652051b9cdbf65735f98d83cc329725aa957'
const privateKey = new Buffer.from(presets.private, 'hex') // get the key from buffer

// set up contract isntance
const abi = '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'
const factory = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351' // ropsten
const contract = new web3.eth.Contract(JSON.parse(abi), factory);

// call data
const data = contract.methods.createExchange(TBTCToken).encodeABI()

web3.eth.getTransactionCount(presets.callerAddress, (err, txCount) => {

    const txobj = {
      nonce:    web3.utils.toHex(txCount),
      to:       factory,
      gasLimit: web3.utils.toHex(6000000),
      gasPrice: web3.utils.toHex(10000000000),
      data: data  
    }
      // Sign the transaction
      const tx = new Tx(txobj, {'chain':'ropsten'});
      tx.sign(privateKey);
  
      const serializedTx = tx.serialize().toString('hex')
  
      // Broadcast the transaction
      const transaction = web3.eth.sendSignedTransaction('0x' + serializedTx, (err, res) => {
        if (err) return console.log('error', err)
        console.log(res)
      });
  });