import "dotenv/config";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import connectDB from "./db/connectDB.js";
import express from "express";
import cors from "cors";
import proxy from "@grpc-web/proxy";

import { getQuestions } from "./services/questionService.js";

const PROTO_PATH = path.resolve("../proto/question.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition);

const app = express();
const server = new grpc.Server();

const expressPort = process.env.EXPRESS_PORT || 3000;
const proxyPort = process.env.PROXY_PORT || 8080;
const grpcPort = process.env.GRPC_PORT || 4000;

const __dirname = path.resolve();
const isProduction = process.env.NODE_ENV === "production";

app.use(cors({ exposedHeaders: ["grpc-status", "grpc-message"] }));
app.use(express.json());

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../speakx/dist")));
  app.get("*all", (req, res) => {
    console.log("Production mode");
    res.sendFile(path.join(__dirname, "../speakx", "dist", "index.html"));
  });
}

server.addService(grpcObject.question.QuestionService.service, {
  GetQuestions: getQuestions,
});

proxy({
  target: isProduction
    ? `https://speakx-8yjv.onrender.com:${grpcPort}`
    : `http://localhost:${grpcPort}`,
}).listen(proxyPort);

console.log(`Proxy server running on port ${proxyPort}`);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(expressPort, () => {
      console.log(`Express server running on port ${expressPort}`);
    });

    server.bindAsync(
      `0.0.0.0:${grpcPort}`,
      grpc.ServerCredentials.createInsecure(),
      (_err, port) => {
        console.log(`Grpc server running on port ${port}`);
      }
    );
  } catch (error) {
    console.log("Error starting server:", error);
  }
};

start();
