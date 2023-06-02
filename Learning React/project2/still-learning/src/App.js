import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [excuse, setExcuse] = useState('')

  function getExcuse(type){
  Axios.get(`https://excuser-three.vercel.app/v1/excuse/${type}`).then((res) => {
    setExcuse(res.data[0].excuse)
  })
}

function handlePartyClick () {
  getExcuse('party');
};

function handleFamilyClick () {
  getExcuse('family');
};

function handleOfficeClick () {
  getExcuse('office');
};

  return (
    <div className="App">
      <h1>Generate an Excuse</h1>
      <button onClick={handlePartyClick}>Party</button>
      <button onClick={handleFamilyClick}>Family</button>
      <button onClick={handleOfficeClick}>Office</button>

      <p>Excuse: {excuse}</p>
    </div>
  );
}

export default App;





































// const [name, setName] = useState("");
// const [data, setData] = useState(null);

// function getData() {
//   Axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
//     setData(res.data);
//   });
// }

// return (
//   <div className="App">
//     <input
//       type="text"
//       onChange={(e) => {
//         setName(e.target.value);
//       }}
//       placeholder="Enter your name"
//     />
//     <button onClick={getData}>Predict Age</button>
//         <p>Predicted Age: {data?.age}</p>
//         <p>Name: {data?.name}</p>
//         <p>Number: {data?.count}</p>
//   </div>
