let config = {};

if (__DEV__) config = { apiUrl: "http://192.168.0.12:5000/api" };
else config = { apiUrl: "https://gameduc-api.herokuapp.com/api" };

export default config;
