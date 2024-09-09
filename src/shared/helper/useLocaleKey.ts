export const getLocalStore = (key: string) => {
  return localStorage.getItem(key) || "";
};

export const setLocalStore = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeLocalStore = (key: string) => {
  localStorage.removeItem(key);
};

export const getSessionStore = (key: string) => {
  return sessionStorage.getItem(key) || "";
};

export const setSessionStore = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const removeSessionStore = (key: string) => {
  sessionStorage.removeItem(key);
};
