import React from "react";
import useVisualMode  from "../../hooks/useVisualMode"



export default function Empty(props) {
  const { onAdd } = props;
  const { mode, transition, back } = useVisualMode()
  const CREATE = "CREATE";

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}