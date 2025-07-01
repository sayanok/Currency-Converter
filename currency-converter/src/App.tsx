import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [amount, setAmount] = useState(String); //直す
  const [converted, setConverted] = useState(1);
  const [currencyBeforeConversion, setCurrencyBeforeConversion] = useState(String);
  const [currencyAfterConversion, setCurrencyAfterConversion] = useState(String);

  function clickHandler() {
    convert();
  }

  function convert() {
    console.log(currencyAfterConversion);
    fetch("https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/" + { currencyBeforeConversion }) //APIKEY発行する
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("リクエストエラー:", error);
      });

    // 変換後のレートをセットする
    // amountにレートをかける

    setConverted(111);
  }
  return (
    <>
      <form>
        <input
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></input>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyBeforeConversion(e.target.value);
          }}
        >
          <option value="yen">yen</option>
          <option value="usd">usd</option>
          <option value="eur">eur</option>
        </select>
        →<div>{converted}</div>
        <select
          name="currency"
          id="currency-select"
          onChange={(e) => {
            setCurrencyAfterConversion(e.target.value);
          }}
        >
          <option value="yen">yen</option>
          <option value="usd">usd</option>
          <option value="eur">eur</option>
        </select>
        <button type="button" onClick={() => clickHandler()}>
          変換する
        </button>
      </form>
    </>
  );
};
export default App;
