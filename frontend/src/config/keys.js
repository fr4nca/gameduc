let config = {};

if (process.env.NODE_ENV !== "production") {
  config = { apiUrl: "https://gameduc-api.herokuapp.com/api" };
} else {
  config = { apiUrl: process.env.REACT_APP_API_URL };
}

export default config;
