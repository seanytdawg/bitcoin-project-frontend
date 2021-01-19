import React from 'react';

function Item(props) {
    console.log("item props: ",props)
    return (
      <div>
          
        <div className="item-card">
          {/* <a href={props.url} target="_blank"> */}
            <h2 className="item-title">{props.title}</h2>
            {props.image ? (
              <img src={props.image} className="item-img" alt=""/>
            ) : null}
            <footer>price {props.price}</footer>
          {/* </a> */}
        </div>
      </div>
    );
}

export default Item;