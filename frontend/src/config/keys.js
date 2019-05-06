let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "http://localhost:5000/api" };
} else {
  config = { apiUrl: "http://localhost/api" };
}

export default config;
