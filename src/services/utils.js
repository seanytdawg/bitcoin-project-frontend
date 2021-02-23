import {fullYear, day, month} from '../date.js'

let bitcoinBACKEND = "http://localhost:3000/";

let currentQuery = "tech"

export const getBitCoinPrice = () =>
  fetch(
    `https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_NOMICS_API_KEY}`, {
    }
  )
    .then((response) => 
       response.json())

export const getBitCoinArticles = () =>
  fetch("https://newscafapi.p.rapidapi.com/apirapid/news/world/?q=bitcoin", {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.REACT_APP_NEWS_CAF_API_KEY}`,
      "x-rapidapi-host": "newscafapi.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.error(err);
    });


 export const getBitcoinStockChartData = () =>
   fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
   .then((response)=>{
       return response.json()
   })


   export const postNewArticle = (article)=>
    fetch(`${bitcoinBACKEND}article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: 
        JSON.stringify(article),
    }).then((response) => {
      return response.json();
    });
   
   export const getArticles = ()=>
    fetch(`${bitcoinBACKEND}articles`).then((response) => {
      return response.json();
    });
   
   export const deleteAllArticles = ()=>{
      fetch(`${bitcoinBACKEND}articles`, {
        method: "DELETE",
      })
    }

    export const refreshArticles = ()=>{
        deleteAllArticles()
        getBitCoinArticles()
        .then((articles)=>{

          articles.forEach((article)=>{
            postNewArticle(article)
          })
        })
    }
 

  export const postNewItem = (item) =>
    fetch(`${bitcoinBACKEND}item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    }).then((response) => {
      return response.json();
    });


export const deleteAllItems = () => {
      fetch(`${bitcoinBACKEND}items`, {
        method: "DELETE",
      });
}

export const refreshItems = (query) => {
  // deleteAllItems();
  getAmazonItems(query)

};

let amazonItemArray = [];
let amazonItemsAsinString = ""

   export const getAmazonItems = (query) =>
     fetch(
       `https://amazon-price.p.rapidapi.com/azapi-azSearch?prime=false&$query=${query}&page=1`,
       {
         method: "GET",
         headers: {
           "x-rapidapi-key":
             process.env.REACT_APP_AMAZON_ITEMS_API_KEY,
           "x-rapidapi-host": "amazon-price.p.rapidapi.com",
         },
       }
     )
       .then((response) => 
          response.json())
          .then((items)=>{
            console.log("items: ",items)
            items.body.results.forEach((item)=>{
              amazonItemsAsinString += item["asin"] + ","
              amazonItemArray.push(item)

            })
          })
          .then(()=>{
            fetch(
              `https://amazon-price.p.rapidapi.com/azapi-bulkPrice?asins=${amazonItemsAsinString}`,
              {
                method: "GET",
                headers: {
                  "x-rapidapi-key": process.env.REACT_APP_AMAZON_ITEMS_API_KEY,
                  "x-rapidapi-host": "amazon-price.p.rapidapi.com",
                },
              }
            )
              .then((response) => {
                console.log("response: ", response);
                return response.json();
              })
              .catch((err) => {
                console.error(err);
              });
          })
       .catch((err) => {
         console.error(err);
       });