// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import './SearchResults.css';
import Loader from '../components/Loader';

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/everything', {
          params: {
            q: query,
            from: new Date().toISOString().split('T')[0],
            sortBy: 'popularity',
          },
        });
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (query) {
      fetchArticles();
    }
  }, [query]);

  if (loading) {
    return <Loader />; // Render Loader component while fetching articles
  }

  if (error) {
    return <div>Error fetching articles: {error}</div>;
  }

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.url}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{article.description}</p>
              <p>{new Date(article.publishedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
