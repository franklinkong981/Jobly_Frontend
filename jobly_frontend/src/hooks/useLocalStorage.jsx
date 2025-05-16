import {useState, useEffect} from "react";

function useLocalStorage(key, initialValue = null) {
  const value = localStorage.getItem(key) || initialValue;

  const [localStorageValue, setLocalStorageValue]= useState(value);

  useEffect(function setLocalStorageValue() {
    if (!localStorageValue) {
      localStorage.removeItem(key);
    } else {
      localStorage(key, localStorageValue);
    }
  }, [key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;