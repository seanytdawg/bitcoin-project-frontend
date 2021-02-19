import React, { useEffect } from 'react';
import './App.css'



function ArticleCard(props) {


    useEffect(()=>{
        console.log("article props", props.urlToImage);

        let image = document.createElement('img')
        document.getElementsByClassName('article-card')[0].append(image)

        document.className = "article-img"
        // image.src = props.urlToImage
    }, [])
    return (
        <div className = "article-card" id = 'yo'>
            <a href = {props.url} target = "_blank">
             <h2 className = "article-title">{props.name}</h2>
             <img src = {`${props.urlToImage}`}/>
            <footer>By {props.author}</footer>
            </a>
        </div>
    );
}

export default ArticleCard;