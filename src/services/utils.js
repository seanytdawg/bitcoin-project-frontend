const BACKEND = "http://localhost:5000/";

let date = new Date();

let fullYear = date.getFullYear()

let day = date.getDate()

let month = date.getMonth()



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
    // .then((articles)=> articles.articles)
