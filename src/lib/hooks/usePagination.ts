import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  function goNextPage() {
    setPage((prevValue) => prevValue + 1);
  }

  function goPrevPage() {
    setPage((prevValue) => prevValue - 1);
  }

  return { page, goNextPage, goPrevPage, setPage, pageSize, setPageSize };
}
