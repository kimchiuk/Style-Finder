FROM nginx:alpine as build
RUN rm -rf /etc/nginx/conf.d/nginx.conf
COPY /nginx.conf /etc/nginx/conf.d/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY /build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]