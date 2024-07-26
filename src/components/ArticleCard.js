import React from 'react';
import './ArticleCard.css';
import moment from 'moment';

const ArticleCard = ({ article }) => {
  if (!article.urlToImage || !article.title || !article.description || !article.publishedAt) {
    return null;
  }

  const publishedAt = moment(article.publishedAt);
  const today = moment();
  const isToday = publishedAt.isSame(today, 'day');
  const isYesterday = publishedAt.isSame(today.clone().subtract(1, 'day'), 'day');

  const formatDate = () => {
    if (isToday) {
      return 'Today';
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      return publishedAt.format('MMMM D, YYYY');
    }
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card"
    >
      <div className="image-container">
        <img src={article.urlToImage} alt={article.title} className="article-image" />
        <div className="image-overlay">
          <h2 className="article-title">{article.title}</h2>
        </div>
      </div>
      <div className="article-details">
        <p className="article-description">{article.description}</p>
        <p className="article-date">{formatDate()}</p>
      </div>
    </a>
  );
};

export default ArticleCard;
