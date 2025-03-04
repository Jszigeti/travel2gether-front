FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./ 

RUN npm install

COPY . .

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

FROM nginx:stable-alpine AS server

COPY ./nginx/prod.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]