import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

interface ValueType {
  value: string;
}

interface DataType {
  [index: string]: {
    [index: string]: ValueType;
  };
}

const Details = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType>();
  let params = useParams();
  useEffect(() => {
    fetch(
      `https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test/${params.detailsId}.json`,
      {
        method: "GET",
      }
    )
      .then((response): Promise<DataType> => {
        return response.json();
      })
      .then((data) => {
        return setData(data);
      })
      .catch((error) => console.log(error));
  }, [params.detailsId]);
  return (
    <div>
      <button onClick={() => navigate(`/`, { replace: true })}>Back</button>
      <p style={{ textAlign: "center", fontSize: "50px" }}>
        {data ? data[Object.keys(data)[0]] : "none"}
      </p>
    </div>
  );
};

export default Details;
