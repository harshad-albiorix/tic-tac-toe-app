import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export const TicTacToePage = () => {
  const [card, setCard] = useState(
    Array(9)
      .fill()
      .map((_) => "-")
  );
  const [sign, setSign] = useState("x");
  const [result, setResult] = useState("pending");
  const [count, setCount] = useState(0);

  const isCompleted = result === "win";

  const toggleSign = () => {
    setSign((prev) => (prev === "x" ? "0" : "x"));
  };

  function isWinningCard(card) {
    for (const [a, b, c] of winningCombinations) {
      if (card[a] === card[b] && card[b] === card[c] && card[a] !== "-") {
        return true;
      }
    }
    return false;
  }

  const handleOnClick = (index, sign) => {
    toggleSign();
    setCard((prev) => {
      return prev.map((x, i) => {
        if (i === index) {
          return sign;
        }
        return x;
      });
    });
    setCount((prev) => prev + 1);
  };

  const handleCheckResult = (card) => {
    if (isWinningCard(card)) {
      return "win";
    } else if (count === 9) {
      return "tie";
    } else {
      return "pending";
    }
  };

  useEffect(() => {
    if (card) {
      const res = handleCheckResult(card);
      if (res === "win") {
        setResult(res);
      } else if (res === "tie") {
        setResult(res);
      }
    }
  }, [card]);

  return (
    <div className="container">
      <div className="toe-container">
        <h2>Tic Tac Toe</h2>
        <h3>{`(${sign}), turn`}</h3>
        <div className="toe-grid">
          {card?.map((item, index) => (
            <button
              disabled={card[index] !== "-" || isCompleted}
              onClick={() => handleOnClick(index, sign)}
              key={index}
              className="card-button"
            >
              {card[index] === "-" ? "" : item}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="refresh-button"
        >
          Refresh
        </button>
        {isCompleted && (
          <ConfettiExplosion
            force={2}
            duration={3000}
            particleCount={500}
            width={2500}
          />
        )}
        <h2>
          {result === "pending"
            ? ""
            : result === "win"
            ? `${sign === "x" ? "0" : "x"} is winner..!`
            : result === "tie" && "Match was tie..!"}
        </h2>
      </div>
    </div>
  );
};
