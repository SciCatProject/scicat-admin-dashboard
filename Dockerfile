FROM --platform=linux/amd64 node:18.18.0-alpine AS builder

WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN npm ci
COPY . /home/node/app/
RUN npm run build

FROM --platform=linux/amd64 nginxinc/nginx-unprivileged:1.25-alpine

COPY --from=builder /home/node/app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
