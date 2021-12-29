import React, { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface ValueType {
  value: string;
}

interface DataType {
  [index: string]: {
    [index: string]: ValueType;
  };
}
interface Props {
  data: DataType | undefined;
  el: ValueType | undefined;
  index: number;
}

const Element: React.FC<Props> = (props) => {
  const [editElement, setEditElement] = useState("");
  const [toggleEdit, setToggleEdit] = useState<{ id: number | null; edit: boolean }>({
    id: null,
    edit: false,
  });

  async function updateElement(newText: string, id: string) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: newText }),
    };
    const response = await fetch(
      `https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test/${id}.json`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  }

  const removeElement = (id: string) => {
    fetch(`https://crudl-ffff6-default-rtdb.europe-west1.firebasedatabase.app/test/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const onStartEdit = useCallback(() => {
    setToggleEdit({ ...toggleEdit, edit: true });
  }, [toggleEdit]);

  const onSave = useCallback(
    (id: string) => {
      console.log(editElement);
      updateElement(editElement, id);
      setToggleEdit({ ...toggleEdit, edit: false });
    },
    [toggleEdit, editElement]
  );

  const onChangeElement = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEditElement(event.target.value);
    },
    [setEditElement]
  );
  return (
    <>
      {!toggleEdit.edit && (
        <>
          <h3 className="item_text">{props.el}</h3>
          <button onClick={onStartEdit}>Edit</button>
        </>
      )}
      {toggleEdit.edit && (
        <>
          <input type="text" onChange={onChangeElement} />
          <button
            onClick={() => onSave(props.data ? Object.keys(props.data)[props.index] : "none")}
          >
            Save
          </button>
        </>
      )}
      <button
        onClick={() => removeElement(props.data ? Object.keys(props.data)[props.index] : "none")}
      >
        Remove
      </button>
      <Link to={`/${props.data ? Object.keys(props.data)[props.index] : "none"}`}> READ </Link>
    </>
  );
};

export default React.memo(Element);
