import React, { Component } from 'react';
import {getBitCoinPrice} from './services/utils'
class Home extends Component {


    state = {
        priceData: null
    }

    componentDidMount = ()=>{
        getBitCoinPrice()
        .then((priceData)=>{
            this.setState({priceData: priceData.priceData})
        })
    }
    render() {
        return (
            <div className = "home">
                <h1>BitCoin Baby</h1>
                {this.state.priceData ? 
            <div>
                <p>
                    {this.state.priceData}
                </p>
            </div>
            :null}
            </div>
        );
    }
}

export default Home;