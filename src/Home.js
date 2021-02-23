import React, { Component } from 'react';
import moment from 'moment'
import {
  getBitCoinPrice,
  getBitCoinArticles,
  // getHousingData,
  getArticles,
  postNewArticle,
  getBitcoinStockChartData,
  getBitCoinArticles2,
  deleteAllArticles,
  getAmazonItems,
  refreshItems,
} from "./services/utils";
import { day, month, fullYear } from "./date.js";
import Select from "react-select";
import './App.css'
import Currencies from './currencies'
import Coin from './assets/bitcoin-coin.png'
import ArticleCard  from './Articles/ArticleCard'
import Item from './Item.js'
import LineChart from "./LineChart";
import InfoBox from './InfoBox'
import ToolTip from './ToolTip'
import House from './House'
import ArticleContainer from './Articles/ArticleContainer'
import {addCommas} from './services/helperFunctions'


const dotenv = require("dotenv");

const env = dotenv.config()

const testArticle = 
{
  "title": "this",
  "content": "is",
  "img": "a",
  "source_url": "test",
  "author": "cool"
}

class Home extends Component {
  state = {
    itemOfTheDay: null,
    priceData: null,
    currencyChosen: "USD",
    currencyDisplayed: "US Dollars",
    currencySymbol: "$",
    flippingCoin: true,
    articles: [],
    mobile: false,
    bitcoinInUSD: null,
    amazonProducts: [],
    sortedData: [],
    fetchingData: true, 
    priceNow: null,
    fullListOfHouses: [],
    houses: []
  };

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    });
  }

  handleSelect = (e) => {
    this.setState({ currencyChosen: e.value });
  this.getBitCoinPriceByCurrentCurrency()
  };

  handleSubmit = () => {
    this.setState({
      currencyDisplayed: this.state.currencyChosen,
      flippingCoin: true,
    });
    this.getBitCoinPriceByCurrentCurrency()
  }


  getBitCoinPriceByCurrentCurrency = ()=>{
    getBitCoinPrice().then((currencies) => {
      console.log("currencies: ",currencies)
      let bitcoinInUSD = null;
      let currentCurrencyToUSD = null;
      currencies.forEach((currency) => {
        if (currency.currency === "BTC") {
          bitcoinInUSD = currency.rate;
          parseFloat(bitcoinInUSD);
          this.setState({bitcoinInUSD})
        }
        if (currency.currency === this.state.currencyChosen) {
          console.log("currency", currency.rate)
          this.setState({ currencySymbol: currency.symbol });
          currentCurrencyToUSD = currency.rate;
          parseFloat(currentCurrencyToUSD);
        }
      });
      let currentPrice = (bitcoinInUSD / currentCurrencyToUSD).toFixed(2);
      console.log("current price: ", currentPrice)
      let currentPriceString = currentPrice.toString();
      this.setState({ priceNow: currentPriceString});
    });
  }
  componentDidMount = () => {
      
    this.getBitCoinPriceByCurrentCurrency()
    let sortedData = [];
    getBitcoinStockChartData()
      .then((bitcoinData) => {
        let count = 0;
        for (let date in bitcoinData.bpi) {
          sortedData.push({
            d: moment(date).format("MMM DD"),
            p: bitcoinData.bpi[date].toLocaleString(),
            x: count,
            y: bitcoinData.bpi[date],
          });
          count++;
        }
      })
      .then(() => {
        this.setState({ sortedData: sortedData, fetchingData: false });
        console.log(this.state.sortedData);
      });

    if (window.innerWidth <= 760) {
      this.setState({ mobile: true });
    }

    getBitCoinPrice()
    if (this.state.articles.length == 0) {
      getArticles().then((articles) => {
        this.setState({ articles: articles.articles });
      });
    }
  };

  showMoreHouses = ()=>{
    this.setState({cutoffHouseIndex: this.state.cutoffHouseIndex + 10})
  }


  showLessHouses = ()=>{
        this.setState({ cutoffHouseIndex: this.state.cutoffHouseIndex - 10 });
  }
  render() {
    return (
      <div className="home">
        <h1>What is Bitcoin's Price?</h1>
        <h2>The one million dollar question</h2>

        {this.state.flippingCoin ? (
          <div className="picker-container">
            Currency: {this.state.currencyDisplayed}
            <Select
              className="currency-picker"
              options={Currencies}
              onChange={this.handleSelect}
              placeholder="US Dollar"
            />
          </div>
        ) : null}
        {this.state.flippingCoin ? (
          <div className="bitcoin-info">
            <p className="stock-price">
              {this.state.currencySymbol}
              { this.state.priceNow ? addCommas(this.state.priceNow) : null}
              {" " + this.state.currencyChosen}
            </p>
            <p>
              One bitcoin is worth {this.state.priceNow}{" "}
              {this.state.currencyChosen}s
            </p>
            <a
              className="nomics link"
              href="https://nomics.com/"
              target="_blank"
            >
              Crypto Market Cap and Pricing Data Provided By Nomics
            </a>
            <p className="stock-price-symbol">{this.state.currencySymbol}</p>
          </div>
        ) : (
          // <div className="coin">
          <img className="coin-img" src={Coin} />
          // </div>
        )}
        <div className="container">
          <div className="row">
            <h1>30 Day Bitcoin Price Chart</h1>
          </div>
          <div className="row">
            {!this.state.fetchingData ? (
              <InfoBox data={this.state.data} />
            ) : null}
          </div>
          <div className="row">
            <div className="popup">
              {this.state.hoverLoc ? (
                <ToolTip
                  hoverLoc={this.state.hoverLoc}
                  activePoint={this.state.activePoint}
                />
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="chart">
              {!this.state.fetchingData ? (
                <LineChart
                  data={this.state.sortedData}
                  onChartHover={(a, b) => this.handleChartHover(a, b)}
                />
              ) : null}
            </div>
          </div>
          <div className="row">
            <div id="coindesk">
              {" "}
              Powered by <a href="http://www.coindesk.com/price/">CoinDesk</a>
            </div>
          </div>
        </div>
        <br></br>
          <div className = "house-container">
        {this.state.houses.slice(0,this.state.cutoffHouseIndex).map((house) => (
          <House {...house} bitcoinPrice={this.state.bitcoinInUSD} city = {house.address.city} state = {house.address.state} />
          ))}
          {this.state.cutoffHouseIndex > 0 ?
          <div>
          <button onClick = {this.showMoreHouses}>Show More Houses</button>
          <button onClick = {this.showLessHouses}>Show Less Houses</button>
          </div>
          :
          this.state.cutoffHouseIndex  === 0 ?
           <button onClick = {this.showMoreHouses}>Show Houses</button>
          :
          this.state.cutoffHouseIndex  === this.state.houses.length ? 
            <button onClick = {this.showLessHouses}>Show Less Houses</button>
          :
          this.state.cutoffHouseIndex  === 10 ?
          <button onClick = {this.showLessHouses}>Hide Houses</button>
          :
          null}
            </div>
        <div className="article-container">
          <ArticleContainer/>
        </div>
      </div>
    );
  }
}

export default Home;