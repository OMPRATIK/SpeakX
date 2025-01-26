import ReactPaginate from "react-paginate";

function PaginationComponent({
  elePerPage,
  total,
  setPage,
  page,
}: {
  elePerPage: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}) {
  const totalPages = Math.ceil(total / elePerPage);

  const handleChange = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="flex flex-row-reverse">
      <div className="flex items-center space-x-3 flex-wrap gap-2">
        <span className="opacity-75 text-sm sm:text-base">
          {page} of {totalPages}
        </span>
        <div className="">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"mx-1"}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handleChange}
            containerClassName={
              "flex justify-center items-center space-x-2 text-xs sm:text-sm"
            }
            pageClassName={
              "size-8 sm:size-10 flex font-semibold items-center justify-center border-[1px] border-neutral-600 rounded-full bg-neutral-700 hover:bg-neutral-800 cursor-pointer"
            }
            previousClassName={
              "size-8 sm:size-10 flex font-semibold items-center justify-center border-[1px] border-neutral-600 rounded-full bg-neutral-700 hover:bg-neutral-800 cursor-pointer"
            }
            nextClassName={
              "size-8 sm:size-10 flex font-semibold items-center justify-center border-[1px] border-neutral-600 rounded-full bg-neutral-700 hover:bg-neutral-800 cursor-pointer"
            }
            activeClassName={"bg-neutral-800"}
            disabledClassName={"opacity-10 cursor-not-allowed"}
            forcePage={page - 1}
            pageLinkClassName="w-full h-full flex items-center justify-center"
            nextLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName="w-full h-full flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
}

export default PaginationComponent;
