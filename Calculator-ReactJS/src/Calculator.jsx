import { useState, useEffect, useCallback } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState(null);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleNumber = useCallback(
    (number) => {
      if (number === "." && currentValue.includes(".")) {
        return;
      }

      if (justCalculated) {
        setDisplay(number);
        setCurrentValue(number);
        setJustCalculated(false);
      } else {
        const newValue = currentValue + number;

        setCurrentValue(newValue);
        setDisplay(
          operator ? previousValue + " " + operator + " " + newValue : newValue
        );
      }
    },
    [currentValue, previousValue, operator, justCalculated]
  );

 

  const handleEquals = useCallback(() => {
    if (!currentValue || !previousValue || !operator) return;

    const curr = Number(currentValue);
    const prev = Number(previousValue);
    const opr = operator;

    let result;
    switch (opr) {
      case "+":
        result = curr + prev;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setPreviousValue("");
    setOperator(null);
    setJustCalculated(true);
  }, [currentValue, previousValue, operator]);


const handleOperator = useCallback(
  (op) => {
    if (!currentValue && !previousValue) return;

    if (previousValue && operator && currentValue) {
      const curr = Number(currentValue);
      const prev = Number(previousValue);
      let result;
      switch (operator) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = prev / curr; break;
        default: return;
      }
      setPreviousValue(result.toString());
      setDisplay(result.toString() + " " + op);
      setCurrentValue("");
    } else {
      setPreviousValue(currentValue);
      setCurrentValue("");
      setDisplay(currentValue + " " + op);
    }

    setOperator(op);
    setJustCalculated(false);
  },
  [currentValue, previousValue, operator]
);



  const handleClear = useCallback(() => {
    setDisplay("");
    setCurrentValue("");
    setOperator(null);
    setPreviousValue("");
    setJustCalculated(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key;

      if (key >= "0" && key <= "9") {
        handleNumber(key);
        pressButton(key);
      } else if (key === ".") {
        handleNumber(".");
        pressButton(".");
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
        pressButton(key);
      } else if (key === "Enter" || key === "=") {
        handleEquals();
        pressButton("=");
      } else if (key === "Backspace" || key.toLowerCase() === "c") {
        handleClear();
        pressButton("c");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentValue,
    previousValue,
    operator,
    justCalculated,
    handleNumber,
    handleOperator,
    handleEquals,
    handleClear,
  ]);

  function pressButton(key) {
    document
      .querySelectorAll(".button-active")
      .forEach((btn) => btn.classList.remove("button-active"));

    const btn = document.querySelector(`button[data-key="${key}"]`);
    if (!btn) return;

    btn.classList.add("button-active");
    setTimeout(() => btn.classList.remove("button-active"), 100);
  }

  return (
    <div className="calculator">
      <div className="display">{display || "0"}</div>
      <div className="buttons">
        <button data-key="c" className="clear" onClick={handleClear}>
          &larr;
        </button>
        <button data-key="9" onClick={() => handleNumber("9")}>
          9
        </button>
        <button data-key="8" onClick={() => handleNumber("8")}>
          8
        </button>
        <button
          data-key="/"
          className="operator"
          onClick={() => handleOperator("/")}
        >
          /
        </button>
        <button data-key="7" onClick={() => handleNumber("7")}>
          7
        </button>

        <button data-key="6" onClick={() => handleNumber("6")}>
          6
        </button>
        <button data-key="5" onClick={() => handleNumber("5")}>
          5
        </button>
        <button
          data-key="*"
          className="operator"
          onClick={() => handleOperator("*")}
        >
          *
        </button>
        <button data-key="4" onClick={() => handleNumber("4")}>
          4
        </button>
        <button data-key="3" onClick={() => handleNumber("3")}>
          3
        </button>
        <button data-key="2" onClick={() => handleNumber("2")}>
          2
        </button>
        <button
          data-key="-"
          className="operator"
          onClick={() => handleOperator("-")}
        >
          -
        </button>
        <button data-key="1" onClick={() => handleNumber("1")}>
          1
        </button>
        <button data-key="0" onClick={() => handleNumber("0")}>
          0
        </button>

        <button data-key="." onClick={() => handleNumber(".")}>
          .
        </button>
        <button
          data-key="+"
          className="operator"
          onClick={() => handleOperator("+")}
        >
          +
        </button>
        <button data-key="=" className="equals" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
}
