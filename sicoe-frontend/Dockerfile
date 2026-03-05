# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_ENV=production

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_ENV=${VITE_ENV}

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

