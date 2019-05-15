let config = {};

if (__DEV__) {
  config = { apiUrl: "http://10.29.19.120:5000/api" };
} else {
  config = { apiUrl: "http://www.gameeduc.com.br/api" };
}

export default config;
