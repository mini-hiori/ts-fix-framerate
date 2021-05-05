FROM node:16-buster

WORKDIR /app

COPY . .

RUN npm install

RUN apt update
RUN apt -y upgrade
RUN apt install -y ffmpeg

CMD [ "node_modules/.bin/ts-node","main.ts"]