import React, { useState } from "react";
import "./App.css";
import CurrencyCode from "./CurrencyCode.js";

const App: React.FC = () => {
  const [amount, setAmount] = useState<number | "">();
  const [converted, setConverted] = useState<number>(0);
  const [currencyBeforeConversion, setCurrencyBeforeConversion] = useState<string>("");
  const [currencyAfterConversion, setCurrencyAfterConversion] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const apiKey = process.env.REACT_APP_API_KEY; //このAPI_KEYは7/15に無効になる

  function onClickHandler() {
    fetchRate();
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    const num = Number(value);

    if (value === "") {
      setAmount("");
      setErrorMessage("数字を入力してください");
      return;
    }

    if (isNaN(num)) {
      setErrorMessage("数字を入力してください");
    } else if (num <= 0) {
      setErrorMessage("0より大きい数字を入力してください");
    } else {
      setErrorMessage("");
      setAmount(num);
    }
  }

  function fetchRate() {
    if (!apiKey) {
      setErrorMessage("APIキーが設定されていません");
      return;
    }
    fetch("https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/" + currencyBeforeConversion)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[currencyAfterConversion];
        if (rate) {
          calculate(rate);
        } else {
          setErrorMessage("指定の通貨が見つかりませんでした");
        }
      })
      .catch((error) => {
        console.error("リクエストエラー:", error);
      });
  }

  function calculate(rate: number) {
    if (typeof amount === "number") {
      setConverted(Number((amount * rate).toFixed(2)));
    } else {
      setErrorMessage("数字を入力してください");
    }
  }
  return (
    <>
      <form>
        <input
          maxLength={9}
          value={amount}
          onChange={(e) => {
            onChangeHandler(e);
          }}
        ></input>
        <select
          name="currency"
          id="currency-select_from"
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
          id="currency-select_to"
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
          disabled={!amount || !currencyBeforeConversion || !currencyAfterConversion}
        >
          変換する
        </button>
      </form>
      <div>{converted}</div>
    </>
  );
};
export default App;
