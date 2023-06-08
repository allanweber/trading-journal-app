FROM nginx:1.24.0-alpine

COPY docker/fullchain.cer /etc/ssl/certs/fullchain.cer
COPY docker/private.key /etc/ssl/private/private.key

COPY /build /usr/share/nginx/html

COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
