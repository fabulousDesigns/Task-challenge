# ! Stage Build
FROM node:alpine3.19 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# ! Stage Production
FROM node:alpine3.19
WORKDIR /app
COPY --from=build /app /app
RUN npm ci
ENV HOST=0.0.0.0
EXPOSE 4000
CMD ["npm", "run", "start:dev", "--", "--host"]

LABEL maintainer="Bernard Maina <designsfabulous8@gmail.com>"
LABEL email="designsfabulous8@gmail.com"
LABEL position="Fullstack Developer"
LABEL name="book-assignment-view-backend"
LABEL description="This is a simple responsive GraphQl application that allows users to view books and authors"
LABEL version="1.0"
