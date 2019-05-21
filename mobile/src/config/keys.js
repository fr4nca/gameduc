let config = {};

if (__DEV__) {
  config = { apiUrl: "http://10.29.19.120:5000/api" };
} else {
  config = { apiUrl: "https://gameduc-api.herokuapp.com/" };
}

export default config;
