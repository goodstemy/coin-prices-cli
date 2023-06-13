#!/usr/bin/env node

const { request } = require('https');

const COIN_LIST_URL = 'https://api.coingecko.com/api/v3/coins/list';
const COIN_PRICE_URL = 'https://api.coingecko.com/api/v3/coins/__token__';

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, resp => {
      let output = [];
    
      resp.on('error', reason => {
        console.error(reason);

        reject(error);
      });
    
      resp.on('data', chunk => {
        output.push(chunk);
      });
    
      resp.on('end', () => {
        output = Buffer.concat(output).toString();
    
        resolve(JSON.parse(output));
      });
    })
    .on('error', reason => {
      console.error(reason);

      reject(error);
    })
    .end();
  });
}

const help = () => {
  return console.log(`
How to use coin-prices-cli:\n
    --help XOR help             : Show all available commands to provide
    --all XOR all               : Show all available tokens to use in price
    --price=weth XOR price=weth : Return usd price of provided token name\n
This software is opensource and using coingecko api with free tier. Limited with 10-30* request per minute.`);
};

(async () => {
  const args = process.argv.slice(2);

  if (!args.length) {
    return help();
  }
  
  for (const arg of args) {
    if (arg === '--help' || arg === 'help') {
      return help();
    }

    if (arg === '--all' || arg === 'all') {
      let outputStr = `Available tokens list:\n`;
      const response = await makeRequest(COIN_LIST_URL);

      for (const obj of response) {
        const { symbol } = obj;

        outputStr += `${symbol}\n`;
      }

      return console.log(outputStr);
    }

    if (arg.includes('--price') || arg.includes('price')) {
      const splitted = arg.split('=');
      
      if (splitted.length < 2) {
        return console.error(`You need to provide token name to get price. For example:\n
coin-prices-cli --price=weth`);
      }
      
      const [_, symbol] = splitted;

      const response = await makeRequest(COIN_PRICE_URL.replace('__token__', symbol));
      const priceUSD = response.market_data.current_price.usd;

      return console.log(`1 ${symbol.toUpperCase()} = ${priceUSD}$`);
    } 
  }
})();
