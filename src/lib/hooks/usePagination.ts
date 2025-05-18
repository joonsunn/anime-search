import { useEffect, useState } from "react";

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
}: {
  initialPage?: number;
  initialPageSize?: number;
}) {
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return { page, setPage, pageSize, setPageSize };
}
