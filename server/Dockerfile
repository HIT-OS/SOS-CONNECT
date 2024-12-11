FROM node:20-alpine

WORKDIR /app

COPY package*.json .

# Install dependencies
RUN npm install

COPY . .

CMD [ "npm", "start" ]