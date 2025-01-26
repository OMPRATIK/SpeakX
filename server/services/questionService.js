import Question from "../models/question.model.js";

export const getQuestions = async (call, callback) => {
  try {
    const { query, type } = call.request;
    const queryObject = {};

    if (query) {
      queryObject.$text = { $search: query };
    }

    if (type) {
      queryObject.type = type;
    }

    let result = Question.find(queryObject);

    const page = call.request.page || 1;
    const limit = call.request.limit || 10;
    const skip = (page - 1) * limit;
    result = await result.skip(skip).limit(limit);

    const count = await Question.countDocuments(queryObject);

    callback(null, { questions: result, count });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};
