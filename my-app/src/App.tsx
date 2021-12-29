import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Element from "./components/Element";

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
  const [reRender, setRerender] = useState(false);

  const createElement = useCallback((input: string) => {
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
  }, []);

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
    return function cleanup() {
      setData(undefined);
    };
  }, [createElement, reRender]);

  const dataArr = [];
  let keys = data && Object.keys(data);
  for (let index = 0; index < (keys ? keys.length : 0); index++) {
    dataArr.push(data && data[Object.keys(data)[index]].value);
  }

  const handleReRender = () => {
    setRerender(!reRender);
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      {dataArr.map((el, index) => {
        return (
          <div className="item" key={index}>
            <Element data={data} el={el} index={index} onReRender={handleReRender} />
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
