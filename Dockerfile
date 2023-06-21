FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8081
CMD node app.js
