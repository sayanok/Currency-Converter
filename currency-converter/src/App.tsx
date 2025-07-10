import React, { useState } from "react";
import "./App.css";
import CurrencyCode from "./CurrencyCode.js";

const App: React.FC = () => {
  const [amount, setAmount] = useState(Number);
  const [converted, setConverted] = useState(0);
  const [currencyBeforeConversion, setCurrencyBeforeConversion] = useState(String);
  const [currencyAfterConversion, setCurrencyAfterConversion] = useState(String);
  const [errorMessage, setErrorMessage] = useState(String);

  function onClickHandler() {
    fetchRate();
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value)) {
      if (Number(event.target.value) >= 0) {
        setErrorMessage("");
        setAmount(Number(event.target.value));
      } else {
        setErrorMessage("0より大きい数字を入力してください");
      }
    } else if (event.target.value === "0") {
      setErrorMessage("0より大きい数字を入力してください");
    } else {
      setErrorMessage("数字を入力してください");
    }
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
    setConverted(Number((amount * rate).toFixed(2)));
  }
  return (
    <>
      <form>
        <input
          maxLength={3}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        ></input>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyBeforeConversion(e.target.value);
          }}
        >
          <option>換算元通貨を選んでください</option>
          {CurrencyCode.map((currencyCodeData) => (
            <option key={currencyCodeData.id} value={currencyCodeData.currencyCode}>
              {currencyCodeData.currencyCode}
            </option>
          ))}
        </select>
        <p>{errorMessage}</p>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyAfterConversion(e.target.value);
          }}
        >
          <option>換算後通貨を選んでください</option>
          {CurrencyCode.map((currencyCodeData) => (
            <option key={currencyCodeData.id} value={currencyCodeData.currencyCode}>
              {currencyCodeData.currencyCode}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onClickHandler()}
          disabled={amount && currencyBeforeConversion && currencyAfterConversion ? false : true}
        >
          変換する
        </button>
      </form>
      <div>{converted}</div>
    </>
  );
};
export default App;
