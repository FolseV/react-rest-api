import React, { useEffect, useState } from "react";
import "./App.css";

interface ValueType {
  value: string;
}

interface DataType {
  [index: string]: {
    [index: string]: ValueType;
  };
}

function App() {
  const [data, setData] = useState<DataType>();
  const [inputData, setInputData] = useState("");

  const createElement = (input: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: input }),
    };
    fetch(
      "https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const removeElement = (id: string) => {
    fetch(`https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test.json", {
      method: "GET",
    })
      .then((response): Promise<DataType> => {
        return response.json();
      })
      .then((data) => {
        return setData(data);
      })
      .catch((error) => console.log(error));
  }, [createElement, removeElement]);

  const dataArr = [];
  let keys = data && Object.keys(data);
  for (let index = 0; index < (keys ? keys.length : 0); index++) {
    dataArr.push(data && data[Object.keys(data)[index]].value);
  }

  console.log(dataArr);
  // console.log(data ? data[Object.keys(data)[0]].value : "none");
  // console.log(data ? Object.keys(data).map((key: any) => [Number(key), data[key]]) : "none");
  // console.log(Object.keys(data));
  // var result = Object.keys(data).map((key: any) => [Number(key), data[key]]);
  // console.log(Object.keys(result));
  return (
    <div className="App">
      <h1>Hello</h1>
      {dataArr.map((el, index) => {
        return (
          <div className="item" key={index}>
            <h3 className="item_text" key={index}>
              {el}{" "}
            </h3>
            <button onClick={() => removeElement(data ? Object.keys(data)[index] : "none")}>
              Remove
            </button>
          </div>
        );
      })}
      <div>
        <h3>Create new element</h3>
        <input type="text" onChange={(e) => setInputData(e.target.value)} />
        <button onClick={() => createElement(inputData)}>Create element</button>
      </div>
    </div>
  );
}

export default App;
