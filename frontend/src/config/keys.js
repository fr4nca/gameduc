let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "http://localhost:5000/api" };
} else {
  config = { apiUrl: "http://178.128.82.157/api" };
}

export default config;
