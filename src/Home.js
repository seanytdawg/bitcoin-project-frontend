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


// import {}'./.env'
// require("dotenv").config();

// const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed

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
    getBitCoinPrice(this.state.currencyChosen).then((priceData) => {
      this.setState({ priceData: priceData.priceData, flippingCoin: false, priceNow: priceData.priceValue });
    });
  };
  componentDidMount = () => {
    let sortedData = [];
    console.log("price now", this.state.priceNow)
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

    // console.log(Currencies)
    getBitCoinPrice("US Dollars").then((priceData) => {
      this.setState({
        priceData: priceData.priceData,
        flippingCoin: false,
        priceNow: priceData.priceValue,
      });
    });
    if (this.state.articles.length == 0) {
      getBitCoinArticles().then((articles) => {
        // articles.slice(10)
        this.setState({ articles: articles.articles });
      });
    }

    if (this.state.itemOfTheDay === null) {
      getAmazonProducts().then((amazonProducts) => {
        this.setState({ itemOfTheDay: amazonProducts[day] });
        // console.log("amazon: ",amazonProducts)
      });
      //     getAmazonProducts().then((amazonProducts) =>{
      // this.setState({ amazonProducts: amazonProducts.amazonProducts });
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
            <p className="stock-price">{this.state.priceNow}</p>
            <p>{this.state.priceData}</p>
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
        <br>
        </br>
        {this.state.itemOfTheDay ? (
          <Item
            {...this.state.itemOfTheDay}
            currentPrice={this.state.priceNow}
          />
        ) : null}
        <div className="article-container">Articles: {articleList}</div>
      </div>
    );
  }
}

export default Home;