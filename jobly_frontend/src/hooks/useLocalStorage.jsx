import {useState, useEffect} from "react";

function useLocalStorage(key, initialValue = null) {
  const value = window.localStorage.getItem(key) || initialValue;

  const [localStorageValue, setLocalStorageValue]= useState(value);

  useEffect(function setLocalStorageValue() {
    if (!localStorageValue) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, localStorageValue);
    }
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;