import React, { useEffect, useState } from 'react';

import {getAmazonProducts, getBitCoinPrice} from './services/utils'

function Item(props) {

    const [rendered, setRendered] = useState(false)

    const howManyItemsCanYouBuy = ()=>{
       
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