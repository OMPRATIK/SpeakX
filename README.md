# SpeakX Full Stack Assignment

This is a responsive full-stack application that demonstrates a robust search functionality for a questions database using modern web technologies, including Typescript, React and tailwind CSS for frontend and Node.js and gRPC for backend. MongoDB and mongoose ODM is used for storing and quering questions data.

## Demo
https://github.com/user-attachments/assets/756c724b-bbd2-4f36-b0fe-f2adb1a00b63

## Overview
![image](https://github.com/user-attachments/assets/4aa90644-bb2d-41b9-a120-9aa306b09e7b)

-Browsers can not directly communicate with grpc servers as they internally use http 2 for communication . Modern browsers still don't have access to internals of http 2 and rely on http 1. So we need to setup a proxy to forward and parse the request like `envoy` or a proxy server at the `backed`.
-Also the use of `protocol buffers` as a data serialization method which is more efficient and faster than something like a `JSON`.

## Key Features
-Load is handled by the server that means, large amount of data is not set to the browser with the help of pagination.
-Advance filtering options, selecting no of responses per page, filter based on type of questions, pagination and advance search with mongo DB `text` option
-Users can see the answers and blocks for `ANAGRAM` questions and also see the options for `MCQ` type questions.
-Implemented debouncing to reduce the frequent access to the server.
-Responsive, clean UI and good user experience 

## How to set up the project locally ?
- Clone the project
```bash
git clone https://github.com/OMPRATIK/SpeakX
```
- Setup environment variables
   - Create `.env` in the `server` folder
   - ```env
     MONGO_URI=<mongodb atlas uri>
     PROXY_PORT = 8080
     EXPRESS_PORT = 3000
     GRPC_PORT = 4000
     NODE_ENV= development / production
     ```
- Install all dependencies from root directory
   - There is `package.json` which has all the scripts
   - ```bash
      npm run install-deps
      ```
     >This installs all the client and server dependencies
   - Or you can individually install dependencies in the `speakx` client folder and `server` folder using `npm install`
- Run the frontend dev server from the root
     - ```bash
       npm run run-dev-client
       ```
     > or just run directly from client `speakX` directory
     - ```bash
       cd speakx
       npm run dev
       ```
- Run the backend dev server from the root
     - ```bash
       npm run run-dev-server
       ```
     > or just run directly from `server` directory
     - ```bash
       cd server
       npm run dev
       ```
## Technologies used
- ### Frontend
   - React
   - Typescript - type safety
   - Tailwind CSS
   - react-paginate - to create pagination
   - @protobuf-ts/plugin - generate client typescript code from proto file
   - @protobuf-ts/grpcweb-transport - To connect to proxy
- ### Backend
   - Node js
   -  @grpc/grpc-js - setup grpc server
   -  @grpc/proto-loader - dynamically loads proto file on the server
   -  express - to serve frontend
   -  @grpc-web/proxy - to create a proxy to the grpc server
### Conclusion
The project successfully showcases a full-stack application built with a focus on robust backend integration and a seamless frontend experience. By leveraging gRPC, MongoDB, and React, the application achieves efficient search functionality, responsive UI, and effective communication between client and server. Key features like pagination, question type filtering, and clean design highlight the project's usability and attention to user experience.
