import { useEffect, useRef, useState } from "react";
import { getQuestions } from "./services/questionService.ts";
import { Question } from "./protos/question.ts";

import Header from "./ui/Header.tsx";
import Spinner from "./ui/Spinner.tsx";

import useDebounce from "./hooks/useDebounce.ts";
import Error from "./ui/Error.tsx";
import Questions from "./ui/Questions.tsx";
import { FaBook, FaFilter, FaSearch } from "react-icons/fa";
import { MdSearchOff } from "react-icons/md";

function App() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const overflowRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");
  const [elePerPage, setElePerPage] = useState<number>(10);
  const [type, setType] = useState<string>("all");

  const [questions, setQuestions] = useState<Question[] | undefined>([]);
  const [total, setTotal] = useState<number | undefined>(0);

  const [page, setPage] = useState(3);

  const debouncedQuery = useDebounce(500, query);

  useEffect(function () {
    searchRef?.current?.focus();
  }, []);

  useEffect(
    function () {
      async function fetchQuestions() {
        try {
          setIsLoading(true);
          const response = await getQuestions({
            query: debouncedQuery,
            type: type === "all" ? "" : type,
            limit: elePerPage,
            page,
          });
          setQuestions(response?.questions);
          setTotal(response?.count);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError((err as Error).message);
          } else {
            setError("An unknown error occurred 💻");
          }
        } finally {
          setIsLoading(false);
          overflowRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }

      fetchQuestions();
    },
    [debouncedQuery, elePerPage, type, page]
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-400">
      <div className="flex flex-col max-w-5xl mx-auto px-2 pt-12 sm:pt-16">
        <Header />
        <div className="mb-2 sm:mb-4">
          <div className="border-[1px] border-neutral-700 mx-auto max-w-2xl text-neutral-300 flex items-center justify-between bg-neutral-800 rounded-full px-4 py-2 gap-4">
            <FaSearch className="size-5" />
            <input
              type="text"
              className="bg-neutral-800 text-xl sm:text-2xl flex-grow outline-none text-neutral-400"
              placeholder="Search for questions. . ."
              ref={searchRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex mb-2 text-sm sm:text-base items-center justify-between px-2">
          <div className="flex gap-1 items-center opacity-75">
            <p className="flex gap-1 text-xs sm:text-base">
              <span className="font-semibold">{total}</span>
              <span className="hidden sm:block">results found</span>
            </p>
            <FaBook />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <label className="flex gap-1 items-center" htmlFor="filter">
                {" "}
                <FaFilter className="size-3" />
                Filter
              </label>
              <select
                id="filter"
                className="bg-neutral-700 text-neutral-400 rounded-full px-2 py-1 sm:px-4 sm:py-2 outline-none cursor-pointer"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
              >
                <option value={"all"}>All Questions</option>
                <option value={"MCQ"}>MCQ</option>
                <option value={"READ_ALONG"}>Read Along</option>
                <option value={"ANAGRAM"}>Anagaram</option>
                <option value={"CONTENT_ONLY"}>Content Only</option>
              </select>
            </div>
            <select
              className="bg-neutral-700 text-neutral-400 rounded-full px-2 py-1 sm:px-4 sm:py-2 outline-none cursor-pointer"
              value={elePerPage}
              onChange={(e) => {
                setElePerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10/page</option>
              <option value={20}>20/page</option>
              <option value={30}>30/page</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden h-[calc(100vh-16rem)] sm:h-[calc(100vh-18rem)] rounded-tr-md rounded-tl-md">
          {isLoading && (
            <div className="flex-grow flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {error && <Error error={error} />}
          {!isLoading && !error && questions?.length === 0 && (
            <div className="flex items-center justify-center h-full text-lg gap-2 opacity-75">
              <p className="text-xl">No Results Found</p>
              <MdSearchOff className="size-7" />
            </div>
          )}
          {!isLoading && !error && questions && questions?.length > 0 && (
            <>
              <div ref={overflowRef} />
              <div
                className="overflow-auto flex-grow px-1 sm:px-4 space-y-2 sm:[&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                <Questions
                  questions={questions}
                  elePerPage={elePerPage}
                  page={page}
                  setPage={setPage}
                  total={total}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
