import { useState } from "react";
import gameData from "./GameData";

export default function Gameboard() {
  const shuffleCards = () => [...gameData].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState(new Set());
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);

  const flipCard = (index) => {
    if (flipped.has(index) || matched.has(index)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(index);
    setFlipped(newFlipped);

    if (newFlipped.size === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = [...newFlipped];
      if (cards[first] === cards[second]) {
        const newMatched = new Set(matched);
        newMatched.add(first);
        newMatched.add(second);
        setMatched(newMatched);
      }
      setTimeout(() => setFlipped(new Set()), 1000);
    }
  };

  const restartGame = () => {
    setCards(shuffleCards());
    setFlipped(new Set());
    setMatched(new Set());
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center my-12">
      <h1 className="text-4xl font-bold mb-4">Memory Game</h1>
      <p className="text-xl mb-6">Moves: {moves}</p>
      
      <div className="grid grid-cols-4 gap-4">
        {cards.map((src, index) => {
          const isFlipped = flipped.has(index) || matched.has(index);
          return (
            <div
              key={index}
              className={`w-[120px] h-[120px] rounded-2xl flex items-center justify-center cursor-pointer shadow-lg ${
                isFlipped ? "bg-white" : "bg-gray-200"
              }`}
              onClick={() => flipCard(index)}
            >
              {isFlipped ? (
                <img className="w-[100px] h-[100px] object-cover" src={src} alt="card" />
              ) : (
                <span className="text-3xl text-blue-500">?</span>
              )}
            </div>
          );
        })}
      </div>

      <button 
        onClick={restartGame} 
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded-2xl hover:bg-blue-600"
      >
        Restart
      </button>
      
      {matched.size === cards.length && <h2 className="text-3xl font-bold mt-6 text-green-600">You won!</h2>}
    </div>
  );
}