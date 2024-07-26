// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, setPage, setCategory, setCountry } from '../redux/articlesSlice';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import Loader from '../components/Loader';
import { useInView } from 'react-intersection-observer';

const categories = [
  'general',
  'business',
  'technology',
  'entertainment',
  'sports',
  'health',
  'science',
];

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'in', name: 'India' },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, status, currentPage, totalPages, category, country, uniqueUrls } = useSelector((state) => state.articles);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5, // Start loading when the element is 50% in view
    triggerOnce: false, // Keep triggering as user scrolls
  });

  useEffect(() => {
    dispatch(fetchArticles({ category, page: currentPage, country }));
  }, [dispatch, category, currentPage, country, uniqueUrls]);

  useEffect(() => {
    if (inView && currentPage < totalPages && status !== 'loading') {
      dispatch(setPage(currentPage + 1));
    }
  }, [inView, currentPage, totalPages, status, dispatch]);

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  const handleCountryChange = (event) => {
    dispatch(setCountry(event.target.value));
  };

  return (
    <div className="homepage">
      <div className="filters">
        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onSelectCategory={handleCategoryChange}
        />
        <select value={country} onChange={handleCountryChange} aria-label="Select a country">
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      {status === 'loading' && currentPage === 1 ? (
        <Loader />
      ) : (
        <>
          <div className="articles">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard key={`${article.url}-${index}`} article={article} />
              ))
            ) : (
              <div>No articles available</div>
            )}
          </div>
          {status === 'loading' && currentPage > 1 && (
            <div className="loading-more">
              <Loader />
            </div>
          )}
          <div ref={loadMoreRef} /> {/* This is the trigger for loading more articles */}
        </>
      )}
    </div>
  );
};

export default HomePage;
