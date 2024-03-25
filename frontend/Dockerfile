FROM node AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html