FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client; yarn; yarn build

EXPOSE 3000

CMD ["yarn", "start"]