import React, { useState } from "react";
import "./calculator.css";
import { BsBackspace } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Calculator6() {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState("");
  const [hasDecimal, setHasDecimal] = useState(false);
  const [isNewNumber, setIsNewNumber] = useState(true);

  



  const handleDigitClick = (value) => {
    if (isNewNumber) {
      setCurrent(value);
      setIsNewNumber(false);
    } else {
      setCurrent(current + value);
    }
  };

  const handleOperatorClick = (operator) => {
    if (current === "") return;
    if (hasDecimal) {
      setHasDecimal(false);
    }
    if (isNewNumber && previous !== "") {
      setOperation(operator);
      return;
    }

    if (previous !== "" && !hasDecimal) {
      calculateResult();
      setOperation(operator);
      setHasDecimal(false);
    } else if (hasDecimal && previous === "" && current !== "") {
      setPrevious(current);
      calculateResult();
      setOperation(operator);
      setHasDecimal(false);
    } else if (hasDecimal && previous !== "") {
      calculateResult();
      setOperation(operator);
      setHasDecimal(false);
    }  else if(operation && previous!==""){
      setCurrent(current);
      setPrevious(current);
      setOperation(operator);
    }
    else {
      setPrevious(current);
      setCurrent("");
      setOperation(operator);
      setHasDecimal(false);
    }
    
  };

  const handleDecimalClick = () => {
    if (isNewNumber) {
      setCurrent("0.");
      setIsNewNumber(false);
      return;
    }
  };
  const lastChar = current[current.length - 1];
  if(lastChar==="=")  {
   setCurrent("");
   setOperation("");
  }
  const calculateResult = () => {
    let result;
    setIsNewNumber(true);

    const prevValue = parseFloat(previous);
    const curValue = parseFloat(current);

    if (isNaN(prevValue) || isNaN(curValue) || operation === "") {
      return;
    }

    switch (operation) {
      case "+":
        result = prevValue + curValue;
        break;
      case "-":
        result = prevValue - curValue;
        break;
      case "*":
        result = prevValue * curValue;
        break;
      case "/":
        if (curValue === 0) {
          setCurrent("Cannot divide by zero");
          setPrevious("");
          setOperation("");
          return;
        }
        result = prevValue / curValue;
        break;
      default:
        return;
    }

    setOperation("");
    setCurrent(result.toString());
    setPrevious(previous + operation+ current+ "=");
  };

  //   setCurrent(result.toString());
  //   setPrevious(previous);
  //   setOperation(operation + current + "=");
  // };

  const handleEqualsClick = () => {

    
    setIsNewNumber(true);
    if (operation === "=") {
      calculateResult();
    } else {
      if (operation && current !== "") {
        setPrevious(current);
        calculateResult();
        
        }
    }
  };

  const handleClearClick = () => {
    setCurrent("");
    setPrevious("");
    setOperation("");
    setHasDecimal(false);
  };

  const toggleSign = () => {
    if (current !== "") {
      setCurrent((parseFloat(current) * -1).toString());
    }
  };

  const percentage = () => {
    if (current === "") return;
    setCurrent((parseFloat(current) / 100).toString());
  };

  const square = () => {
    try {
      const result = (parseFloat(current) ** 2).toString();
      setCurrent(result);
      setPrevious("sqr(" + current + ")");
    } catch (error) {
      setCurrent("ERROR");
    }
  };

  const squareRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(current));
      setCurrent(result);
      setPrevious("√(" + current + ")");
    } catch (error) {
      setCurrent("ERROR");
      setPrevious("ERROR");
    }
  };

  const clearSingleResult = () => {
    try {
      setCurrent(current.slice(0, -1));
      console.log("true");
    } catch (error) {
      setCurrent("Error");
    }
  };

  const oneByX = () => {
    try {
      const currentVariable = parseFloat(current);
      if (currentVariable !== 0) {
        const result = 1 / currentVariable;
        setCurrent(result.toString());
        setPrevious("1/(" + current + ")");
      } else {
        setCurrent("Error");
      }
    } catch (error) {
      setCurrent("Error");
    }
  };

  
  // const chooseOperationHandler = (el) => {
  //   if (current === "") {
  //     setPrevious("0");
  //     setOperation(el);
  //   } else if (current === ".") {
  //     setPrevious("0");
  //     setOperation(el);
  //   } else if (equal) {
  //     setEqual("");
  //     setOperation(el);
  //     setPrevious(current);
  //   } else if (previous) {
  //     // setPrevious(current);
  //     setOperation(el);
  //     let value = compute();
  //     setPrevious(value);
  //   } else {
  //     setPrevious(current);
  //     setOperation(el);
  //   }

  //   setOperation(el);
  //   setCurrent("");
  // };

  // const equalHandler = (value) => {
  //   if (value === "=") {
  //     if (current === "") return;
  //     if (current === "0.") setPrevious("0");
  //     let ans = calculateResult();
  //     setOperation(operation);
  //     previous ? setPrevious(current) : setPrevious(current);
  //     setEqual(value);
  //     setCurrent(ans);
  //   }
  // };

  const buttons = [
    { label: "%", clickHandler: percentage },
    { label: "CE", clickHandler: handleClearClick },
    { label: "C", clickHandler: handleClearClick },
    { label: <BsBackspace />, clickHandler: clearSingleResult },
    { label: "¹/𝓍", clickHandler: oneByX },
    { label: "𝓍²", clickHandler: square },
    { label: "²√𝓍", clickHandler: squareRoot },
    { label: "/", clickHandler: () => handleOperatorClick("/") },
    { label: "7", clickHandler: () => handleDigitClick("7") },
    { label: "8", clickHandler: () => handleDigitClick("8") },
    { label: "9", clickHandler: () => handleDigitClick("9") },
    { label: "×", clickHandler: () => handleOperatorClick("*") },
    { label: "4", clickHandler: () => handleDigitClick("4") },
    { label: "5", clickHandler: () => handleDigitClick("5") },
    { label: "6", clickHandler: () => handleDigitClick("6") },
    { label: "-", clickHandler: () => handleOperatorClick("-") },
    { label: "1", clickHandler: () => handleDigitClick("1") },
    { label: "2", clickHandler: () => handleDigitClick("2") },
    { label: "3", clickHandler: () => handleDigitClick("3") },
    { label: "+", clickHandler: () => handleOperatorClick("+") },
    { label: "+/-", clickHandler: toggleSign },
    { label: "0", clickHandler: () => handleDigitClick("0") },
    { label: ".", clickHandler: handleDecimalClick },
    { label: "=", clickHandler: handleEqualsClick },
  ];

  const renderButtons = () => {
    return buttons.map((button, index) => (
      <div className="col" key={index} onClick={button.clickHandler}>
        {button.label}
      </div>
    ));
  };

  return (
    <div className="calcBa">
      <Link className="call" to="/">
        Back
      </Link>
      <div className="calc">
        <div className="section">
          <div className="display">
            <div className="heading">
              <div className="head">Calculator</div>
              <div className="standered">
                <span>
                  <FaBars />
                  Standard
                </span>
              </div>
            </div>

            <div className="secondDisplay">
              <h6>
                {previous}
                {operation}
              </h6>
            </div>
            <div className="firstDisaplay">
              {<h2>{current ? current : previous}</h2>}
            </div>
          </div>
          <div className="buttons">{renderButtons()}</div>
        </div>
      </div>
    </div>
  );
}
export default Calculator6;
