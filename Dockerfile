FROM node:14.20.0

WORKDIR /app

COPY package.json ./

RUN npm cache clean --force

RUN rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]