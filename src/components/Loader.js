// src/components/Loader.js
import React from 'react';
import './Loader.css'

const Loader = () => (
  <div className="loader">
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
    <p>Loading...</p>
  </div>
);

export default Loader;