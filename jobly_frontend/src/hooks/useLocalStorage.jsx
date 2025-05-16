import {useState, useEffect} from "react";

function useLocalStorage(key, initialValue = null) {
  const value = localStorage.getItem(key) || initialValue;

  const [localStorageValue, setLocalStorageValue]= useState(value);

  

  return [localStorageValue, setLocalStorageValue];
}

export default useLocalStorage;