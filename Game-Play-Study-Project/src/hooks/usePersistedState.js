import { useState } from "react";

export default function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const presistedState = localStorage.getItem(key);

    if (!presistedState) {
      return typeof initialState === "function" ? initialState() : initialState;
    }

    const presistedStateData = JSON.parse(presistedState);

    return presistedStateData;
  });

  const setPersistedState = (input) => {
    const data = typeof input === "function" ? input(state) : input;
    const persistedData = JSON.stringify(data);

    localStorage.setItem(key, persistedData);

    setState(data);
  };

  return [state, setPersistedState];
}
