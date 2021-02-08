import React, { useEffect, useState } from 'react';

import {getBitCoinPrice} from './services/utils'

function Item(props) {

    const [rendered, setRendered] = useState(false)

    const howManyItemsCanYouBuy = ()=>{
        getBitCoinPrice('us dollars')
        .then((priceData)=>{
            let numBitCoin = parseFloat(priceData.priceValue)
            let numPrice = parseFloat(props.price.split("$")[1]);
            let numItems = Math.floor(numBitCoin / numPrice);
           let itemText = document.createElement('p')
            itemText.innerHTML = `You can buy ${numItems} of this item with 1 bitcoin!`
            document.getElementsByClassName('item-card')[0].appendChild(itemText)
        //   `you can buy $(numItems}`
        })
    }

    useEffect(()=>{
        if(!rendered){
            console.log("rendered ",rendered)
        howManyItemsCanYouBuy()
    setRendered(true);
        }
    })
    return (
        <div>
            Item of the day:
        <div className="item-card">
            <h2 className="item-title">{props.title}</h2>
            {props.image ? (
              <img src={props.image} className="item-img" alt=""/>
            ) : null}
            <footer>price {props.price}</footer>
        </div>
      </div>
    );
}

export default Item;