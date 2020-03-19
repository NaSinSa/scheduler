import React from "react";

import "components/Button.scss";

export default function Button(props) {
  const classNames = require('classnames');
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  console.log(props)

  return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}
