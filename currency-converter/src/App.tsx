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
    convert();
  }

  function convert() {
    // fetch("https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/" + { currencyBeforeConversion }) //APIKEY発行する
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);

    // 返り値で修正する
    var returnedRate = 100;

    // });
    // })
    // .catch((error) => {
    //   console.error("リクエストエラー:", error);
    // });
    setConverted(amount * returnedRate);
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
