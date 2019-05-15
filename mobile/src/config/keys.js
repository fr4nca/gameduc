let config = {};

if (__DEV__) {
  config = { apiUrl: "http://10.62.152.23:5000/api" };
} else {
  config = { apiUrl: "http://www.gameeduc.com.br/api" };
}

export default config;
