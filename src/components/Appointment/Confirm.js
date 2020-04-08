import React from "react";
import Button from "components/Button/Button";


export default function Confirm (props) {
  const { message, onConfirm, onCancel } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={() => onCancel(false)}>Cancel</Button>
        <Button danger onClick={() => onConfirm(true)}>Confirm</Button>
      </section>
    </main>
  );
};