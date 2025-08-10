
# URL Shortener

A simple full-stack URL shortener app built with React (frontend) and Node.js + Express + MongoDB (backend). Easily shorten URLs and manage them via an admin panel.

---
## Live Here
[URL Shortener](https://url-shortener-p6fm.onrender.com/admin)

## Features

- Shorten long URLs into compact short links
- Admin panel to view all URLs and their click stats
- Password-protected admin access
- URL validation on backend
- Responsive UI with Bootstrap
- Environment variables for config

---

## Technologies Used

- Frontend: React, React Router, Axios, Bootstrap
- Backend: Node.js, Express, MongoDB, Mongoose
- Deployment: Render

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/TusharPatil843/URL-Shortener.git
cd URL-Shortener
````

### 2. Backend setup

```bash
cd backend
npm install
```

* Create a `.env` file in `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
ADMIN_PASSWORD=your_admin_password
```

* Start backend server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

* Create a `.env` file in `frontend` folder:

```
REACT_APP_API_URL=http://localhost:5000
```

* Start frontend app:

```bash
npm start
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Usage

* Enter a valid URL (include http\:// or https\://) and shorten it
* Copy and share the shortened URL
* Access the Admin panel via password to view/manage URLs and clicks

---

## Deployment

* Backend and frontend are deployed on Render
* Set environment variables on Render for production URLs and passwords

---

## Environment Variables

| Variable             | Description                      |
| -------------------- | -------------------------------- |
| PORT                 | Backend server port              |
| MONGO\_URI           | MongoDB connection string        |
| BASE\_URL            | Backend base URL for short links |
| ADMIN\_PASSWORD      | Password for admin panel access  |
| REACT\_APP\_API\_URL | Frontend API base URL            |

---

## Author

Tushar Patil
*[GitHub](https://github.com/TusharPatil843)
*[LinkedIn](https://www.linkedin.com/in/tusharpatil843/)

---

Feel free to open issues or contribute!
---
