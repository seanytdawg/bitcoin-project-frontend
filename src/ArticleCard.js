import React, { useEffect } from 'react';
import './App.css'



function ArticleCard(props) {
    useEffect(()=>{
        console.log("Article card")
    },[props.title])
    return (
        <div className = "article-card" >
            <a href = {props.url} target = "_blank">
             <h2 className = "article-title">{props.title}</h2>
             <img src = {`${props.img}`}/>
            <footer>By {props.author}</footer>
            </a>
        </div>
    );
}

export default ArticleCard;