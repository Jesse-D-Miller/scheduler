import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory(prev => (
      replace
        ? [...prev.slice(0, prev.length - 1), mode]
        : [...prev, mode]
    ));
  }

  function back() {
    if (history.length !== 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)])
    } else {
      return history;
    }
  }

  return { mode: history[history.length - 1], transition, back };
}