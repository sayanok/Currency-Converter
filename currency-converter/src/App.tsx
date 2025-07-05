import React, { useState } from "react";
import "./App.css";
import CurrencyCode from "./CurrencyCode.js";

const App: React.FC = () => {
  const [amount, setAmount] = useState(Number);
  const [converted, setConverted] = useState(1);
  const [currencyBeforeConversion, setCurrencyBeforeConversion] = useState(String);
  const [currencyAfterConversion, setCurrencyAfterConversion] = useState(String);
  const [errorMessage, setErrorMessage] = useState(String);

  function clickHandler() {
    fetchRate();
  }

  function fetchRate() {
    fetch("https://v6.exchangerate-api.com/v6/dd06a713523fea8a5beaaf77/latest/" + currencyBeforeConversion)
      .then((response) => response.json())
      .then((data) => {
        const conversionRates = data.conversion_rates;

        for (const currency in conversionRates) {
          currency === currencyAfterConversion && calculate(conversionRates[currency]);
        }
      })
      .catch((error) => {
        console.error("リクエストエラー:", error);
      });
  }

  function calculate(rate: number) {
    setConverted(amount * rate);
  }
  return (
    <>
      <form>
        <input
          type="number"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        ></input>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyBeforeConversion(e.target.value);
          }}
        >
          {CurrencyCode.map((currencyCodeData) => (
            <option key={currencyCodeData.id} value={currencyCodeData.currencyCode}>
              {currencyCodeData.currencyCode}
            </option>
          ))}
        </select>
        →<div>{converted}</div>
        <p>{errorMessage}</p>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyAfterConversion(e.target.value);
          }}
        >
          {CurrencyCode.map((currencyCodeData) => (
            <option key={currencyCodeData.id} value={currencyCodeData.currencyCode}>
              {currencyCodeData.currencyCode}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => clickHandler()}>
          変換する
        </button>
      </form>
    </>
  );
};
export default App;
