FROM node:14 as builder 

WORKDIR /app
COPY . .
RUN  npm install
RUN npm run build

FROM nginx:latest 

COPY --from=builder /app/build/. /usr/share/nginx/html


COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080


CMD [ "nginx"]