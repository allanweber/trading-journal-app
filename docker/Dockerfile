FROM nginx:1.24.0-alpine

COPY /build /usr/share/nginx/html

COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
