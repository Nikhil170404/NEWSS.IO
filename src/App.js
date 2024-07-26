// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SearchResults from './pages/SearchResults';
import Navbar from './components/Navbar';
import ContactPage from './pages/ContactPage'; // Import ContactPage
import AboutPage from './pages/AboutPage'; // Import AboutPage
import './App.css';

const App = () => {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/article/:url" element={<ArticlePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/contact" element={<ContactPage />} /> {/* Route for ContactPage */}
          <Route path="/about" element={<AboutPage />} /> {/* Route for AboutPage */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
