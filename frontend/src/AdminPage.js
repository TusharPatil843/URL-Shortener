import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Get API base URL from environment variable
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if user already logged in previously
    const authStatus = localStorage.getItem("isAdminAuth");
    if (authStatus === "true") {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      axios.get(`${apiUrl}/api/admin/urls`)
        .then(res => setUrls(res.data))
        .catch(err => console.error('Error fetching URLs:', err));
    }
  }, [isAuthorized, apiUrl]);

  const handleLogin = async () => {
    const entered = prompt("Enter admin password:");
    if (!entered) return;

    try {
      const res = await axios.post(`${apiUrl}/api/admin/check-password`, {
        password: entered
      });

      if (res.data.success) {
        setIsAuthorized(true);
        localStorage.setItem("isAdminAuth", "true");
      } else {
        alert("❌ Wrong password!");
      }
    } catch (err) {
      console.error("Error checking password:", err);
      alert("⚠️ Server error while checking password");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="text-center mt-5">
        <h2>🔒 Admin Access</h2>
        <button className="btn btn-primary mt-3" onClick={handleLogin}>
          Enter Admin Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Admin Panel - All Shortened URLs</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No URLs found</td>
              </tr>
            ) : (
              urls.map((url, index) => (
                <tr key={url._id}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={url.originalUrl} target="_blank" rel="noreferrer">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`${apiUrl}/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`${apiUrl}/${url.shortCode}`}
                    </a>
                  </td>
                  <td>{url.clicks || 0}</td>
                  <td>{new Date(url.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
