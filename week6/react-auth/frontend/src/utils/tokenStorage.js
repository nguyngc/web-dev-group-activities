const TOKEN_KEY = 'authToken';

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
}
