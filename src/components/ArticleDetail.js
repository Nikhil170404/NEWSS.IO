import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = ({ articles }) => {
  const { url: urlString } = useParams();
  const url = decodeURIComponent(urlString);
  const article = articles.find((a) => a.url === url);

  if (!article) return <p>Article not found</p>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;