let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "http://localhost:5000/api" };
} else {
  config = {};
}

export default config;
