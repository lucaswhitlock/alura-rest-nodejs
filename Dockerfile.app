FROM node:15.12.0-alpine3.10 as build-stage

WORKDIR /app

COPY ./client ./client

WORKDIR /app/client

RUN npm install -s

RUN npm run build

FROM nginx:stable-alpine as release-stage

WORKDIR /app

COPY --from=build-stage /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
