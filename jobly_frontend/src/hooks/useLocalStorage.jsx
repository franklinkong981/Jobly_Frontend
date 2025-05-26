import {useState, useEffect} from "react";

/**
 * This is a custom hook for keeping the state, which in this app will be logged in user/token info, synced with localStorage.
 * This way when the page is refreshed/reloaded, a logged in user would still be logged in.
 * 
 * Starts out by checking in localStorage to see if the attribute specified by key exists.
 * If it doesn't, set the value of localStorageValue to the initialValue parameter.
 * BUT if it does exist, sets the value of the localStorageValue to this value in localStorage.
 * 
 * Whenever the value of the key prop in localStorage changes, it either removes the key from localStorage
 * if localStorageValue is null or sets the key attribute in localStorageValue to be the new value of localStorageValue.
 * 
 * Other components have access to the localStorageValue and can change it, and when it's changed it's also updated in localStorage through this hook.
 * 
 * This is just state that is synced to/from localStorage.
 */
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