import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/Loader';

const ArticlePage = () => {
  const { q } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await api.get('/everything', {
          params: {
            q: q,
            from: new Date().toISOString().split('T')[0],
            sortBy: 'popularity',
          },
        });
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to fetch articles');
        setLoading(false);
      }
    };

    if (q) {
      fetchArticles();
    }
  }, [q]);

  // No need for handleSearchChange function

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (articles.length === 0) {
    return <div>No articles found for "{q}"</div>;
  }

  return (
    <div className="article-page">
      <h1>Articles for "{q}"</h1>
      {articles.map((article) => (
        <a
          key={article.url}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div>
            <h2>{article.title}</h2>
            <p>{article.publishedAt}</p>
            <img src={article.urlToImage} alt={article.title} />
            <p>{article.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ArticlePage;
