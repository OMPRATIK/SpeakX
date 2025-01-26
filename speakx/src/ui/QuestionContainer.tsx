
import { Question } from "../protos/question.ts";

import { useMemo, useState } from "react";


import shuffleArray from "../utils/shuffleArray.ts";
import { RiSpeakAiFill } from "react-icons/ri";
import { GiChoice } from "react-icons/gi";
import { IoExtensionPuzzle } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

function QuestionContainer({
  question,
  questionIndex,
}: {
  question: Question;
  questionIndex: number;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const blocks = useMemo(
    () => shuffleArray(question.blocks),
    [question.blocks]
  );

  return (
    <div className="bg-neutral-800 p-2 rounded-md border-[1px] border-neutral-700">
      {/* Header for the question type */}
      {question.type === "READ_ALONG" && (
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-xl">Read Along</p>
          <RiSpeakAiFill className="size-4" />
        </div>
      )}
      {question.type === "MCQ" && (
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-xl">Multiple Choice Question</p>

          <GiChoice className="size-4" />
        </div>
      )}
      {question.type === "ANAGRAM" && (
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-xl">
            Anagram {question.anagramType === "WORD" ? "(Word)" : "(Sentence)"}
          </p>

          <IoExtensionPuzzle className="size-4" />
        </div>
      )}
      {question.type === "CONTENT_ONLY" && (
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-xl">Content Only</p>

          <MdContentCopy className="size-4" />
        </div>
      )}
      {/* Question title */}
      <div>
        {question.type === "READ_ALONG" ? (
          <div className="flex gap-1">
            <span className="font-semibold">{questionIndex}.</span>
            <p className="italic opacity-75">"{question.title}"</p>
          </div>
        ) : (
          <div className="flex gap-1">
            <span className="font-semibold">{questionIndex}.</span>
            <p className="opacity-75">{question.title}</p>
          </div>
        )}
      </div>
      {/* Question options */}
      {question.type === "MCQ" && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`bg-neutral-700/75 rounded-md p-1.5 border-[1px] border-neutral-600`}
            >
              <p className="font-semibold flex gap-1 sm:gap-2.5">
                <span>{String.fromCharCode(65 + index)}.</span>
                {option.text}
              </p>
            </button>
          ))}
        </div>
      )}
      {/* Anagram Blocks */}
      {question.type === "ANAGRAM" && question.anagramType === "WORD" ? (
        <div className="flex items-center gap-2 mt-2">
          {blocks.map((block, index) => (
            <div
              key={index}
              className="font-semibold flex items-center justify-center size-8 bg-neutral-700/75 rounded-md border-[1px] border-neutral-600"
            >
              {block.text}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 mt-2">
          {blocks.map((block, index) => (
            <div
              key={index}
              className="font-semibold flex bg-neutral-700/75 rounded-md border-[1px] border-neutral-600 px-2 py-1"
            >
              {block.text}
            </div>
          ))}
        </div>
      )}
      {/* Anagram Solution */}
      {question.type === "ANAGRAM" && (
        <div className="mt-2 text-sm opacity-75 flex gap-2">
          <button
            className="cursor-pointer hover:underline"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide" : "Show"} Answer
          </button>
          {showAnswer && (
            <p>
              : <span className="italic">"{question.solution}"</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionContainer;
