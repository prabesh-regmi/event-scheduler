import { Api, buildQueryParams } from "./api";

export const fetchData = async (url, params = {}) => {
  try {
    const query = buildQueryParams(params);
    const res = await Api.get(`${url}${query ? `?${query}` : ""}`);
    return res.data;
  } catch (err) {
    return err?.response?.data?.message;
  }
};

export const getEvents = async (params = {}) => {
  const data = await fetchData("/events", params);
  return data;
};
export const getHolidays = async (params = { country: "NP", year: "2023" }) => {
  const data = await fetchData("/holidays", params);
  return data;
};
