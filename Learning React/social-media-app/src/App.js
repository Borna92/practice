import "./App.css";

function App() {
  const name = <h1>Borna</h1>;
  const age = <h2>30</h2>;
  const from = <h2>Toronto</h2>;
  const user = (
    <div>
      {name}
      {age}
      {from}
    </div>
  );

  return (
    <div className="App">
      {user}
      {user}
      {user}
    </div>
  );
}


const GetName = () => {
  return 'Borna'
}

const GetNameComponent = () => {
  return <h1>Borna</h1>
}

export default App;
