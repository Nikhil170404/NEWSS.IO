// src/pages/ContactPage.js
import React from 'react';
import './ContactPage.css'; // Import CSS file for ContactPage

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        You can reach out to us via email at <a href="mailto:contact@newsapp.com">contact@newsapp.com</a> or by phone at +1-123-456-7890.
      </p>
      <p>
        Our office address is:<br />
        News App Inc.<br />
        123 News St, Cityville, Country
      </p>
    </div>
  );
};

export default ContactPage;
