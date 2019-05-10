FROM node

WORKDIR /usr/src/app

ARG url=none
ENV REACT_APP_API_URL=$url

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn; yarn build

EXPOSE 3000

CMD ["yarn", "prod"]