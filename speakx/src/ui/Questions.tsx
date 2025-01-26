import { Question } from "../protos/question";
import PaginationComponent from "./PaginationComponent";
import QuestionContainer from "./QuestionContainer";

type QuestionsProps = {
  questions: Question[] | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  elePerPage: number;
  total?: number;
};

export default function Questions({
  questions,
  page,
  setPage,
  elePerPage,
  total,
}: QuestionsProps) {
  return (
    <>
      <div className="flex flex-col gap-2.5 mt-2">
        {questions?.map((question, idx) => (
          <QuestionContainer
            key={question.id}
            question={question}
            questionIndex={elePerPage * (page - 1) + idx + 1}
          />
        ))}
      </div>

      <div className="mt-8 mb-6 px-1 sm:px-4">
        <PaginationComponent
          total={total ? total : 0}
          elePerPage={elePerPage}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
}
