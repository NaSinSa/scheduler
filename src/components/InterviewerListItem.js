import React from "react";

import "components/InterviewerListItem.scss";

const className = require('classnames');

export default function InterviewerListItem(props) {
  const {name, avatar, selected, setInterviewer} = props;
  const interviewerClass = 
    selected ? className("interviewers__item--selected") : className("interviewers__item");
  return ( 
  <li className={interviewerClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
};