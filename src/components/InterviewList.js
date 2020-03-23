import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewList.scss";
import InterviewerListItem from "./InterviewerListItem.js";

const className = require('classnames');

export default function InterviewerList(props) {
  const interviewerListClass = ("interviewers__list");
  const interviewrChecker = props.interviewers.map((ele) => {
    return (
      <InterviewerListItem 
        key={ele.id} 
        name={ele.name} 
        avatar={ele.avatar} 
        selected={ele.id === props.value} 
        setInterviewer={(event) => props.onChange(ele.id)} 
      />
    );
  });
  return ( 
    <ul className={interviewerListClass}>
      {interviewrChecker}
    </ul>
  );
};

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};