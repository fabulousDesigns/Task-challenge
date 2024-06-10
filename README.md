## Overview

This project is a simple responsive book assignment application where teachers can assign books. The app is built using React, TypeScript, and Material-UI (MUI), and it uses a GraphQL server to fetch book data.

## Features

- **Search Bar**: Allows users to search for books by title.
- **Search Results**: Displays a list of books matching the search criteria with the title, author, and a button to add the book to the teacher's reading list.
- **Reading List**: Shows all the books the teacher has added, with an option to remove books from the list.

## Requirements

- **Frontend Framework**: React
- **Component Library**: Material-UI (MUI)
- **GraphQL Server**: Used to fetch book data
- **Optional** : Docker

## GraphQL Server

Clone this repo and navigate to /backend:

- Run the following:

  ```sh
  npm i && npm run start:dev
  ```

  To use Docker build the Image first and then run the container as shown below:

```sh
# Build the Image
docker build -t book-assignment-view-backend:v1 .
# Run the container
docker run -d -p 4000:4000 --name book-app-backend book-assignment-view-backend:v1
```

To confim if the container is running please run the following:

```sh
# Check the logs of your newly created container
docker logs book-app-backend
```

You should see the output below:

```sh
# Output
[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/app.ts --host`
🚀  Server ready at: http://localhost:4000/
```

## Frontend Setup

### Start FrontEnd

Navigate to folder book-assigment-view = `cd book-assigment-view`

- Run the following:

```sh
npm i
```

If you face issues with node versions and conflicting dependencies, rerun the command in the following manner:

```sh
 npm i --legacy-peer-deps
```

Then proceed to run the UI as follows:

```sh
npm run dev
```

You see the following output:

```sh
Re-optimizing dependencies because vite config has changed

  VITE v5.2.13  ready in 390 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Start Frontend with Docker

To execute the frontend using Docker, start by building the image and then proceed to create a container from the newly built image.

```sh
# Build the Image
docker build -t book-assignment-view:v1 .
# Run the container
docker run -d -p 5173:5173 --name book-app-view book-assignment-view:v1
```

To confim if the container is running please run the following:

```sh
# Check the logs of your newly created container
docker logs book-app-view
```

You should see the output below:

```sh
Re-optimizing dependencies because vite config has changed

  VITE v5.2.13  ready in 390 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Optional

This repository also contains manifest files in case you wish to deploy in a Kubernetes cluster. However, before proceeding, you need to push the images you've created to a registry of your choice. Then, run the following command:

```sh
kubectl apply -f deployment.yaml
```

---

## Maintainer

- **Name**: Bernard Maina
- **Email**: designsfabulous8@gmail.com
- **Position**: Fullstack Developer

## Screenshots

### Laptop

|                  1                   |                   2                   |
| :----------------------------------: | :-----------------------------------: |
| ![First Image](/images/laptop-1.png) | ![Second Image](/images/laptop-2.png) |

### Ipad

|                 1                  |                  2                  |
| :--------------------------------: | :---------------------------------: |
| ![First Image](/images/ipad-1.png) | ![Second Image](/images/ipad-2.png) |

### Mobile Phones

|                     1                      |                      2                      |
| :----------------------------------------: | :-----------------------------------------: |
| ![First Image](/images/mobile-phone-1.png) | ![Second Image](/images/mobile-phone-2.png) |
