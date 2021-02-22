import React, { useEffect } from 'react';
import './App.css'



function ArticleCard(props) {


    useEffect(()=>{
        console.log("article props", props);

        let image = document.createElement('img')
        document.getElementById('article-card').append(image)

        document.className = "article-img"
    }, [])
    return (
        <div className = "article-card" id = 'article-card'>
            <a href = {props.url} target = "_blank">
             <h2 className = "article-title">{props.name}</h2>
             <img src = {`${props.urlToImage}`}/>
            <footer>By {props.author}</footer>
            </a>
        </div>
    );
}

export default ArticleCard;