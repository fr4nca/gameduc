let config = {};

if (__DEV__) {
  config = { apiUrl: "http://192.168.50.162:5000/api" };
} else {
  config = { apiUrl: "http://www.gameeduc.com.br/api" };
}

export default config;
