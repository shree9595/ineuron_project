FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install 
COPY ./build ./
EXPOSE 5000
CMD ["npm","start"]