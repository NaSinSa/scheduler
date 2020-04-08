import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace) {
    if (!replace) {                             //mode == SAVING, DELETING, CONFIRM, SHOW, etc
      setHistory(prev => [...prev, mode]);      // Do not want to keep transition modes === saving, deleting, confirm, errors, create, edit
      return setMode(mode);
    } else {
      history.pop();
      setHistory(() => [...history, mode]);
      return setMode(mode);
    }
  };
  const back = function() {
    history.pop();
    return setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
}