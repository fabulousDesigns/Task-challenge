#!-----> Build stage
FROM node:alpine3.19 as build
WORKDIR /app
COPY package.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

#!-----> Production stage
FROM node:alpine3.19
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

LABEL maintainer="Bernard Maina <"
LABEL email="designsfabulous8@gmail.com"
LABEL position="Fullstack Developer"
LABEL name="book-assignment-view"
LABEL description="This is a simple responsive book assignment app built with React Typescript and MUI"
LABEL version="1.0"
