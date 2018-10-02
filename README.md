When using server.js

{
  "name": "v1",
  "version": "1.0.0",
  "description": "Petbnb v1",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./server/server.js"
  },
  "author": "Shiyun Zhang",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3",
    "nodemon": "^1.17.5",
    "@grpc/proto-loader": "^0.1.0",
    "google-protobuf": "^3.0.0",
    "grpc": "^1.11.0"
  }
}