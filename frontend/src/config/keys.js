let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "http://localhost:5000/" };
} else {
  config = { apiUrl: "http://142.93.52.18/api" };
}

export default config;
