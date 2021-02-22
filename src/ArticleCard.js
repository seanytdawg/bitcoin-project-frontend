import React, { useEffect } from 'react';
import './App.css'



function ArticleCard(props) {


    useEffect(()=>{
        console.log("image ",props.urlToImage)
        let ArticleCards = document.getElementsByClassName("article-card")
        console.log(ArticleCards[ArticleCards.length-1]);

    }, [])
    return (
        <div className = "article-card" >
            <a href = {props.url} target = "_blank">
             <h2 className = "article-title">{props.name}</h2>
             <img src = {`${props.urlToImage}`}/>
            <footer>By {props.author}</footer>
            </a>
        </div>
    );
}

export default ArticleCard;