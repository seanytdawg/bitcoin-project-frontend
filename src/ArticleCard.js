import React from 'react';
import PropTypes from 'prop-types';
import './App.css'

ArticleCard.propTypes = {
    
};

function ArticleCard(props) {
    return (
        <div className = "article-card">
            <a href = {props.url} target = "_blank">
             <h2 className = "article-title">{props.title}</h2>
             {props.urlToImage ? 
            <img src= {props.urlToImage} className = "article-img" alt=""/> 
            :
            null }
            <footer>by {props.author}</footer>
            </a>
        </div>
    );
}

export default ArticleCard;