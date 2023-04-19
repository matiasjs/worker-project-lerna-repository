import webStorage from "./webStorage.interface";

const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = <T>(key: string): T | void => {
  const value = localStorage.getItem(key);

  if (value) {
    JSON.parse(value) as T;
  }
};

const deleteStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, deleteStorage };
