import {fullYear, day, month} from '../date.js'


let currentQuery = "tech"

export const getBitCoinPrice = () =>
  fetch(
    `https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_NOMICS_API_KEY}`, {
    }
  )
    .then((response) => 
       response.json())


 export const getBitcoinStockChartData = () =>
   fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
   .then((response)=>{
       return response.json()
   })