export const getAccessTokens = () => {
  let users = null;
  try {
    users = JSON.parse(localStorage.getItem("accessToken") ?? "");
  } catch (error) {
    users = null;
  }
  return users;
};
export const getRefreshTokens = () => {
  let users = null;
  try {
    users = JSON.parse(localStorage.getItem("refreshToken") ?? "");
  } catch (error) {
    users = null;
  }
  return users;
};

export const setAccessTokens = (tokens) =>
  tokens && localStorage.setItem("accessToken", JSON.stringify(tokens));

export const setRefreshTokens = (tokens) =>
  tokens && localStorage.setItem("refreshToken", JSON.stringify(tokens));
