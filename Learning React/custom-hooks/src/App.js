import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const initialCards = [
  {
    id: 1,
    value: "X",
    visible: true,
  },
  {
    id: 2,
    value: "X",
    visible: true,
  },
  {
    id: 3,
    value: "Y",
    visible: true,
  },
  {
    id: 4,
    value: "Y",
    visible: true,
  },
  {
    id: 5,
    value: "Z",
    visible: true,
  },
  {
    id: 6,
    value: "Z",
    visible: true,
  },
];

function App() {
  const [cards, setCards] = useState(initialCards);

  const toggle = (id) => {
    setCards((prevCards) =>{
      prevCards.map((card) =>{
       return card.id === id ? { ...card, visible: false } : card
      })
    });
  };

  return (
    <div className="App">
      <div className="container">
        {cards.map((card) => {
          return card.visible ? (
            <div
              key={card.id}
              className="card"
              onClick={() => {
                toggle(card.id);
              }}
            >
              {card.value}
            </div>
          ) : null}
        )}
      </div>
    </div>
  );
}

export default App;
