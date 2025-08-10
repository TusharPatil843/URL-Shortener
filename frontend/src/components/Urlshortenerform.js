import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setError('');
    setShortUrl('');
    setCopied(false);

    const res = await axios.post(`${apiUrl}/api/shorten`, { originalUrl });
    
    console.log('Response data:', res.data);  // <-- Add this here
    
    setShortUrl(`${apiUrl}/${res.data.shortCode}`);
  // or res.data.shortCode depending on what you get
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || 'Something went wrong');
  }
};


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdminAccess = () => {
    const password = prompt('Enter Admin Password:');
    if (password === 'admin123') {  // you can change this
      navigate('/admin');
    } else if (password !== null) {
      alert('Incorrect password!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        {/* Admin Page Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-warning"
            onClick={handleAdminAccess}
          >
            Go to Admin Page
          </button>
        </div>

        <h2 className="text-center mb-4">URL Shortener</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter long URL (include http:// or https://)"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Shorten URL
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {shortUrl && (
          <div className="mt-4">
            <label className="form-label fw-bold">Short URL:</label>
            <div className="input-group">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="form-control text-primary"
                style={{ textDecoration: 'none' }}
              >
                {shortUrl}
              </a>
              <button
                className={`btn ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;
