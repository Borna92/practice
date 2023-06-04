import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useCounter } from "./useCounter";

function App() {
  const [count, increase, decrease, reset] = useCounter()

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default App;
