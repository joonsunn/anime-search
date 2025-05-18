import { useTheme } from "@mui/material";
import { useMediaQuery, Stack, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useMemo } from "react";
import type { PaginatedResponse } from "../api/types";

type PaginationButonProps<T> = {
  data: PaginatedResponse<T>;
  page: number;
  setPage: (Page: React.SetStateAction<number>) => void;
  pageSize: number;
  setPageSize: (pageSize: React.SetStateAction<number>) => void;
  pageSelectorsRange?: number;
};

export function PaginationButtons<T>({
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  pageSelectorsRange = 3,
}: PaginationButonProps<T>) {
  const pageSizeOptions = [5, 10, 15, 20, 25].map((option) => ({
    label: option.toString(),
    value: option,
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const pageOptions = useMemo(() => {
    if (!data) return [];
    return Array.from(Array(data?.pagination.last_visible_page)).map((_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
    }));
  }, [data]);
  if (!data) return null;

  function handleGoNextPage() {
    if (data?.pagination.has_next_page) {
      setPage((prevValue: number) => prevValue + 1);
    }
  }

  function handleGoPrevPage() {
    if (data?.pagination && data?.pagination.current_page > 1) {
      setPage((prevValue) => prevValue - 1);
    }
  }

  function handleGoToFirstPage() {
    setPage(1);
  }
  function handleGoToLastPage() {
    if (data?.pagination) {
      setPage(data?.pagination.last_visible_page);
    }
  }

  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
    setPage(1);
  };

  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems="center" justifyContent={"flex-end"} className={"pagination-buttons"}>
        {page !== 1 ? <Button onClick={handleGoToFirstPage}>{"|<"}</Button> : null}
        {data?.pagination && data?.pagination.current_page > 1 ? (
          <Button onClick={handleGoPrevPage}>{"<"}</Button>
        ) : null}

        {data?.pagination && pageOptions.length > 0
          ? pageOptions
              .filter((option) => option.value < page + pageSelectorsRange && option.value > page - pageSelectorsRange)
              .map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setPage(option.value)}
                  variant={option.value === page ? "outlined" : undefined}
                  disabled={option.value === page}
                  sx={{
                    textTransform: "none",
                    display: isMobile ? (option.value === page ? undefined : "none") : undefined,
                  }}
                >
                  {option.value === page ? (isMobile ? option.label : `Page: ${page}`) : option.label}
                </Button>
              ))
          : null}
        <Stack>
          {data?.pagination && data?.pagination.has_next_page ? (
            <Button onClick={handleGoNextPage}>{">"}</Button>
          ) : null}
        </Stack>
        {data?.pagination && data?.pagination.last_visible_page !== page ? (
          <Button onClick={handleGoToLastPage}>{">|"}</Button>
        ) : null}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent={"flex-end"}>
        <FormControl sx={{ width: "120px" }}>
          <InputLabel>Items per page</InputLabel>
          <Select
            value={pageSize}
            onChange={(event) => handleChangePageSize(Number(event.target.value))}
            label="Items per page"
          >
            {pageSizeOptions.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
