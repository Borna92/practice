import { useState } from "react";

export function useToggle(initialVal = false) {
  const [state, setState] = useState();

  function toggle() {
    setState((prev) => !prev);
  }

  return [state, toggle];
}
