import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const [isDegreeMode, setIsDegreeMode] = useState(false);

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  const toggleDegreeMode = () => {
    setIsDegreeMode(!isDegreeMode);
  };

  const handleButton = (value) => {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      let func = sciFunc[value];
      if (isDegreeMode && (value === "sin" || value === "cos" || value === "tan")) {
        func = `convertToDegree(Math.${value})`;
      }
      setDisplayEXP(displayEXP + value + "(");
      setExpression(expression + func + "(");
    } else if (value === ")") {
      setDisplayEXP(displayEXP + value);
      setExpression(expression + value + ")");
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") {
      calcResult();
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  };

  const factorial = (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  };

  const extractLastNum = (exp) => {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  };

  const convertToDegree = (func) => {
    return (x) => func(x * (Math.PI / 180));
  };

  const calcResult = () => {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  };

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow
        handleButton={handleButton}
        toggleDegreeMode={toggleDegreeMode}
        isDegreeMode={isDegreeMode}
      />
    </div>
  );
};

export default Calculator;
