import { Api } from "./api";
import {
  getRefreshTokens,
  setAccessTokens,
  setRefreshTokens,
} from "../utils/getTokens";

export const handleAfterLogin = (tokens) => {
  const { accessToken, refreshToken } = tokens;
  setAccessTokens(accessToken);
  setRefreshTokens(refreshToken);
};

export const handleLogin = async (payload) => {
  try {
    const { email, password } = payload;
    const rs = await Api.post("/auth/login", { email, password });
    if (rs?.status === 200) {
      handleAfterLogin(rs.data?.tokens);
      return rs.data.user;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
export const registerHandler = async (payload) => {
  try {
    const { name, email, password, role = "user" } = payload;
    const rs = await Api.post("/auth/register", {
      name,
      role,
      email,
      password,
    });
    if (rs?.status === 201) {
      handleAfterLogin(rs.data.tokens);
      return rs.data.user;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
export const logoutHandler = async () => {
  try {
    const refreshToken = getRefreshTokens();
    const rs = await Api.post("/auth/logout", { refreshToken });
    if (rs?.status === 204) {
      return true;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
export const createEvent = async (payload) => {
  try {
    const rs = await Api.post("/events", payload);
    if (rs?.status === 201) {
      return rs.data;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
export const updateEvent = async (eventId, payload) => {
  try {
    const rs = await Api.put(`/events/${eventId}`, payload);
    if (rs?.status === 200) {
      return rs.data;
    }
    return false;
  } catch (err) {
    return err.response?.data;
  }
};
