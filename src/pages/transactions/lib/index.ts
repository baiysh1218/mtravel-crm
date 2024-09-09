import { useSearchParams } from "react-router-dom";

const PAGE_COUNT = "20";

export const getParams = () => {
  const [params] = useSearchParams();

  const search = params.get("search") || "";
  const fromDate = params.get("fromDate") || "";
  const toDate = params.get("toDate") || "";
  const page = parseInt(params.get("page") || "1");
  const status = params.get("status") || "";

  return { search, fromDate, toDate, page, status, page_size: PAGE_COUNT };
};
