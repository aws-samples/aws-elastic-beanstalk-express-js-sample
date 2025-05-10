FROM node:14

WORKDIR /usr/app/data

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node","app.js"]
