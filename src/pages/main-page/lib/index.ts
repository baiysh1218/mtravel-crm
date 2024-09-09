import { useSearchParams } from "react-router-dom";

const PAGE_COUNT = "20";

export const getParams = () => {
  const [params] = useSearchParams();

  const search = params.get("search") || "";
  const fromDate = params.get("fromDate") || "";
  const toDate = params.get("toDate") || "";
  const page = parseInt(params.get("page") || "1");
  const topic = params.get("topic") || "";
  const status = params.get("status") || "";
  const page_size = params.get("page_size") || PAGE_COUNT;

  return { search, fromDate, toDate, page, topic, status, page_size };
};
