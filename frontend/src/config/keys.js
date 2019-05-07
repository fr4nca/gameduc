let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "http://localhost:5000/api" };
} else {
  config = { apiUrl: process.env.REACT_APP_API_URL };
}

export default config;
