import React from "react";

const KeysWindow = ({ handleButton, toggleDegreeMode, isDegreeMode }) => {
  const sciKeys = ["sin", "cos", "tan", "ln", "log", "π", "e", "^", "!", "√"];

  const basicKeys = [
    "7", "8", "9", "*", "/",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "DEL", "AC",
    "=", "(", ")"
  ];

  return (
    <div className="keysWindow">
      <div className="keys_scientific">
        {sciKeys.map((item, index) => (
          <button key={index} onClick={() => handleButton(item)}>
            {item}
          </button>
        ))}
        <button onClick={toggleDegreeMode}>
          {isDegreeMode ? "Deg" : "Rad"}
        </button>
      </div>
      <div className="line"></div>
      <div className="keys_basic">
        {basicKeys.map((item, index) => (
          <button
            key={index}
            className={`${item >= "0" && item <= "9" ? "number" : ""} ${
              item === "=" && "equal"
            }`}
            onClick={() => handleButton(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeysWindow;
