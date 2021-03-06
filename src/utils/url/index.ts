import queryString from "query-string";
import { PAGE_SIZES, getDefaultPageSize } from "components/PageSizeSelector";

const arrayFormat = "comma";
const pageKey = "page";
const limitKey = "limit";

export const getPageFromSearch = (search: string): number => {
  const parsed = queryString.parse(search, { arrayFormat });
  const page = parseInt((parsed[pageKey] ?? "").toString(), 10);
  return !Number.isNaN(page) && page >= 0 ? page : 0;
};

export const getLimitFromSearch = (search: string): number => {
  const parsed = queryString.parse(search, { arrayFormat });
  const limit = parseInt((parsed[limitKey] ?? "").toString(), 10);
  return !Number.isNaN(limit) && PAGE_SIZES.includes(limit)
    ? limit
    : getDefaultPageSize();
};

export { updateUrlQueryParam } from "./updateUrlQueryParam";
