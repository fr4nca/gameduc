let config = {};

if (__DEV__) {
  config = { apiUrl: "http://192.168.0.12:5000/api" };
} else {
  config = { apiUrl: "http://www.gameeduc.com.br/api" };
}

export default config;
