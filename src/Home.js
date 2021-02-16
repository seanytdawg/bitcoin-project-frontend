import React, { Component } from 'react';
import moment from 'moment'
import {
  getBitCoinPrice,
  getBitCoinArticles,
  getAmazonProducts,
  getBitcoinStockChartData,
} from "./services/utils";
import { day } from "./date.js";
import Select from "react-select";
import './App.css'
import Currencies from './currencies'
import Coin from './assets/bitcoin-coin.png'
import ArticleCard  from './ArticleCard'
import Item from './Item.js'
import LineChart from "./LineChart";
import InfoBox from './InfoBox'
import ToolTip from './ToolTip'


const dotenv = require("dotenv");

const env = dotenv.config().parsed

class Home extends Component {
  state = {
    itemOfTheDay: true,
    priceData: null,
    currencyChosen: "USD",
    currencyDisplayed: "US Dollars",
    currencySymbol: "$",
    flippingCoin: true,
    articles: [],
    mobile: false,
    amazonProducts: [],
    sortedData: [],
    fetchingData: true, 
    priceNow: null
  };

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    });
  }

  handleSelect = (e) => {
    this.setState({ currencyChosen: e.value });


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
      let bitcoinInUSD = null;
      let currentCurrencyToUSD = null;
      currencies.forEach((currency) => {
        if (currency.currency === "BTC") {
          bitcoinInUSD = currency.rate;
          parseFloat(bitcoinInUSD);
        }
        if (currency.currency === this.state.currencyChosen) {
          this.setState({ currencySymbol: currency.symbol });
          currentCurrencyToUSD = currency.rate;
          parseFloat(currentCurrencyToUSD);
        }
      });
      let currentPrice = (bitcoinInUSD / currentCurrencyToUSD).toFixed(2);
      this.setState({ priceNow: currentPrice });
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

    // console.log("environment ", process.env.REACT_APP_ARTICLE_API_KEY);
    if (window.innerWidth <= 760) {
      this.setState({ mobile: true });
    }

    getBitCoinPrice()
    if (this.state.articles.length == 0) {
      getBitCoinArticles().then((articles) => {
        this.setState({ articles: articles.articles });
      });
    }
  };

  render() {

    let articleList = this.state.articles.map((article, index) => {
      return <ArticleCard key={index} {...article} />;
    });
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
            <button id="button-converter" onClick={this.handleSubmit}>
              Convert to Coin!
            </button>
            <p className="stock-price">{this.state.priceNow}</p>
            <p className = "stock-price-symbol">{this.state.currencySymbol}</p>
            <p>One bitcoin is worth {this.state.priceNow} {this.state.currencyChosen}s</p>
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
        {this.state.itemOfTheDay ? (
          <Item
            {...this.state.itemOfTheDay}
            currentPrice={this.state.priceNow}
          />
        ) : null}
        <div className="article-container">
          <h2>Articles:</h2> {articleList}
        </div>
      </div>
    );
  }
}

export default Home;