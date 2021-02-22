import {fullYear, day, month} from '../date.js'

let bitcoinBACKEND = 'localhost3000/'

export const getBitCoinPrice = () =>
  fetch(
    `https://api.nomics.com/v1/exchange-rates?key=${process.env.REACT_APP_NOMICS_API_KEY}`, {
    }
  )
    .then((response) => 
       response.json())

export const getBitCoinArticles = () =>
  fetch(
    `http://newsapi.org/v2/everything?q=bitcoin&from=${fullYear}-${month}-${day}sortBy=publishedAt&apiKey=${process.env.REACT_APP_ARTICLE_API_KEY}`,

  ).then((response) => {
    return response.json();
  });

  export const getBitCoinPrice2 = () =>
    fetch(
      "https://google-search3.p.rapidapi.com/api/v1/search/q=what+is+bitcoins+price+in+usd&num=20",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "313c14a523mshf1ab9612b84937ep1a3a81jsnc29c693f29d4",
          "x-rapidapi-host": "google-search3.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.error(err);
      });

      export const getBitCoinArticles2 = () =>
        fetch(
          "https://bing-news-search1.p.rapidapi.com/news/search?q=Bitcoin&freshness=Day&textFormat=Raw&safeSearch=Off",
          {
            method: "GET",
            headers: {
              "x-bingapis-sdk": "true",
              "x-rapidapi-key":
                "313c14a523mshf1ab9612b84937ep1a3a81jsnc29c693f29d4",
              "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
            },
          }
        )
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


   export const postNewArticle = (article)=>{
    fetch(`${bitcoinBACKEND}article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        article,
      },
    }).then((response) => {
      return response.json();
    });
   }
  //  export const getArticles = ()=>{
  //   fetch(`localhost3000/articles`).then((response) => {
  //     return response.json();
  //   });
  //  }

  //  export const getHousingData = () =>
  //    fetch(
  //      "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=New%20York%20City&limit=200&offset=0&state_code=NY&sort=relevance",
  //      {
  //        method: "GET",
  //        headers: {
  //          "x-rapidapi-key": process.env.REACT_APP_HOUSING_API_KEY,
  //          "x-rapidapi-host": "realtor.p.rapidapi.com",
  //        },
  //      }
  //    )
  //      .then((response) => {
  //        return response.json();
  //      })
  //      .catch((err) => {
  //        console.error(err);
  //      });



  //  export const getAmazonProducts = ()=>{

  //   fetch(
  //     `https://amazon-price.p.rapidapi.com/azapi-azSearch` +
  //       new URLSearchParams({
  //         prime: "false",
  //         query: "affiliate marketing",
  //         page: "1",
  //       }),

  //     {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         // credentials: "include",
  //         "Access-Control-Allow-Origin": "*",
  //         "x-rapidapi-key": process.env["x-rapidapi-key"],
  //         "x-rapidapi-host": "amazon-price.p.rapidapi.com",
  //         useQueryString: true,
  //       },
  //     }
  //   ).then((response) => {
  //     console.log("amazon response", response);
  //   });
  //  }