FROM node

WORKDIR /usr/src/app

ARG dbhost=none
ARG dbuser=none
ARG dbpassword=none
ARG dbname=none
ARG jwtsecret=none

ENV DB_HOST=$dbhost
ENV DB_USER=$dbuser
ENV DB_PASSWORD=$dbpassword
ENV DB_DATABASE=$dbname
ENV JWT_SECRET=$jwtsecret
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]