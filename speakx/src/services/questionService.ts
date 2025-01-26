import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { QuestionServiceClient } from "../protos/question.client.ts";

type request = {
  type: string;
  query: string;
  limit: number;
  page: number;
};

const transport = new GrpcWebFetchTransport({
  baseUrl: "http://localhost:8080",
});

const client = new QuestionServiceClient(transport);

export const getQuestions = async (request: request) => {
  try {
    const response = await client.getQuestions(request);
    return response.response;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch questions 🥲");
  }
};
