const fetch = require('node-fetch');
const WebSocket = require('ws');

const API_KEY = 'YOUR_API_KEY';
const STOCK_SYMBOL = 'AAPL'; // Example: Apple stock
const UPDATE_INTERVAL = 60000; // 1 minute
let stockData = {};
const wss = new WebSocket.Server({ port: 8080 });
const alertThreshold = 170;

async function fetchStockData() {
    try {
         const response = await fetch(`https://api.twelvedata.com/price?symbol=${STOCK_SYMBOL}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
          if (data && data.price) {
            stockData = {
                price: parseFloat(data.price),
                timestamp: new Date().toISOString(),
            };
          console.log('Fetched price:', stockData.price);
           if (stockData.price < alertThreshold) {
              console.log('Alert triggered:', stockData.price);
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                 client.send(JSON.stringify({
                   type: 'alert',
                   message: `Price of ${STOCK_SYMBOL} is below ${alertThreshold} at ${stockData.price}`}));
             }
             })
          }
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}


function startStockDataStream() {
  setInterval(async() => {
    await fetchStockData();
     wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'stock_data', data: stockData }));
      }
     });
  }, UPDATE_INTERVAL);
}


wss.on('connection', ws => {
  console.log('client connected');
    ws.on('message', message => {
      console.log('received: %s', message);
   });
   ws.send(JSON.stringify({ type: 'stock_data', data: stockData}));
})
startStockDataStream();
