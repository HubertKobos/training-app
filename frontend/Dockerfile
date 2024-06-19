FROM node:latest as builder

RUN mkdir -- /app
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --prod
CMD ["npm", "start"]