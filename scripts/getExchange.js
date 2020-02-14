const presets = require('../presets')
let Web3 = require("web3");

// variables
const TBTCToken = '0x083f652051b9cdbf65735f98d83cc329725aa957'

//init web3
const provider = new Web3.providers.HttpProvider(presets.url)
const web3 = new Web3(provider);

// set up contract isntance
const abi = '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'
var contractAddress = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351';
const uniswap = new web3.eth.Contract(JSON.parse(abi), contractAddress);

// querry 
async function getExchange() {
    let exchange = await (uniswap.methods.getExchange(TBTCToken)).call()
    console.log("TBTC Exchange: " + exchange)
}
getExchange()