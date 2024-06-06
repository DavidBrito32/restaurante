FROM node:20.13.1

WORKDIR /app/

COPY ./ /app/

RUN npm install --global npm@latest

RUN npm install

EXPOSE 3306

CMD [ "npm", "run", "dev" ]