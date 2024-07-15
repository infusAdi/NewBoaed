import { useState } from "react";

export function useSorting(initialField = "", initialOrder = "ASC") {
  const [sorting, setSorting] = useState({
    id: initialField,
    order: initialOrder === "DESC",
  });
  return {
    sorting,
    onSortingChange: setSorting,
    order: sorting.order ? sorting.order.toUpperCase() : initialOrder,
    field: sorting.id ? sorting.id : initialField,
  };
}
