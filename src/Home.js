import React, { Component } from 'react';
import {getBitCoinPrice, getBitCoinArticles, getAmazonProducts} from './services/utils'
import Select from "react-select";
import './App.css'
import Currencies from './currencies'
import Coin from './assets/bitcoin-coin.png'
import ArticleCard  from './ArticleCard'
import Item from './Item.js'

class Home extends Component {


    state = {
      itemOfTheDay: null,
        priceData: null,
        currencyChosen: "US Dollars", 
        currencyDisplayed: "US Dollars",
        flippingCoin: true,
        articles: [],
        mobile: false,
        amazonProducts: [],
    }

    handleSelect = (e) =>{
      this.setState({currencyChosen: e.value})
    }

    handleSubmit = ()=>{
        this.setState({currencyDisplayed: this.state.currencyChosen, flippingCoin: true})
        getBitCoinPrice(this.state.currencyChosen).then((priceData) => {
          this.setState({ priceData: priceData.priceData, flippingCoin: false });
        });
    }
    componentDidMount = ()=>{
        console.log("window width: ", window.innerWidth)
        if(window.innerWidth <= 760){
            this.setState({mobile: true})
            // console.log("mobile")
        }

        // console.log(Currencies)
        getBitCoinPrice("US Dollars")
        .then((priceData)=>{
            this.setState({priceData: priceData.priceData, flippingCoin: false})
        })
        if(this.state.articles.length == 0){
        getBitCoinArticles().then((articles) =>{
    this.setState({ articles: articles.articles }); 
        })

      }
        if(this.state.itemOfTheDay===null){
          getAmazonProducts()
          .then((amazonProducts)=>{
            this.setState({itemOfTheDay: amazonProducts[0]})
            // console.log("amazon: ",amazonProducts)
            console.log("item of the day", this.state.itemOfTheDay)
          })

    //     getAmazonProducts().then((amazonProducts) =>{
    // this.setState({ amazonProducts: amazonProducts.amazonProducts }); 
        }
    }
    


    render() {
        console.log("state: ",this.state.articles)
  
       let articleList = this.state.articles.map((article, index)=>{
            return (<ArticleCard
              key = {index}
            {...article}
            />)
        })
        return (
          <div className="home">
            <h1>What is Bitcoin's Price?</h1>
            Currency: {this.state.currencyDisplayed}
            <div className="picker-container">
              <Select
                className="currency-picker"
                options={Currencies}
                onChange={this.handleSelect}
                placeholder="US Dollar"
              />
            </div>
            {!this.state.flippingCoin ? (
              <div className="bitcoin-info">
                <button onClick={this.handleSubmit}>Convert to Coin!</button>
                <p>{this.state.priceData}</p>
              </div>
            ) : (
              <div className="coin">
                <img className="coin-img" src={Coin} />
              </div>
            )}
             <div className="article-container">Articles: {articleList}</div>
             {this.state.itemOfTheDay ? 
             
            //  <div className = "item-container"></div>
             <Item {...this.state.itemOfTheDay}/>
             : 
             null}
          </div>
        );
    }
}

export default Home;