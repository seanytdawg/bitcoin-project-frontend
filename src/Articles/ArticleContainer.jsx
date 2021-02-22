import React, { useEffect, useState } from 'react';
import {month, day, fullYear} from '../date.js'
import { fetchArticlesAndPostToBackend, getArticles } from '../services/utils.js';
import ArticleCard from '../ArticleCard'
const todaysDate = `${month}/${day}/${fullYear}`
class ArticleContainer extends React.Component {

    state = {
        articles: []
    }

    componentDidMount = ()=>{
       if(localStorage['article-fetch-date'] !== todaysDate){
        localStorage.setItem("article-fetch-date", `${month}/${day}/${fullYear}`);
            console.log("fetching bro")
            fetchArticlesAndPostToBackend()
        }
        getArticles()
        .then((articles)=>{
            console.log("articles bro", articles)
            this.setState({articles})
        })
    }   

   render(){
    return (
        <div>
            {this.state.articles.map((article)=>{
              return <ArticleCard {...article}/>
            }
            )}
        </div>
    );
   }
}

export default ArticleContainer;