import {fullYear, day, month} from '../date.js'


const BACKEND = "http://localhost:3000/"



export const getBitCoinPrice = (currency)=>fetch(`${BACKEND}price`, {
    headers: {
        currency: currency
    }
})
.then((response)=>{
    console.log("returned with a status of", response.status)
    return response.json()
})

export const getBitCoinArticles = () =>
  fetch(
    `http://newsapi.org/v2/everything?q=bitcoin&from=${fullYear}-${month}-${day}sortBy=publishedAt&apiKey=${process.env.REACT_APP_ARTICLE_API_KEY}`
  ).then((response) => {
    return response.json();
  });


export const getAmazonProducts = () =>
    fetch(`${BACKEND}items`)
    .then((response) => {
    //   console.log("amazon response: ", response)
        return response.json();
 });

 export const getBitcoinStockChartData = () =>
   fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
   .then((response)=>{
       return response.json()
   })
    // .then((articles)=> articles.articles)
