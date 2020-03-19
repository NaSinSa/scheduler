import React from "react";

import "components/InterviewList.scss";
import InterviewerListItem from "./InterviewerListItem.js";

const className = require('classnames');

  export default function InterviewerList(props) {
    const interviewerListClass = ("interviewers__list");

    const interviewrChecker = props.interviewers.map((ele) => {
      return (
        <InterviewerListItem 
          // className={interviewerClass}
          key={ele.id} 
          name={ele.name} 
          avatar={ele.avatar} 
          selected={ele.id === props.value} 
          setInterviewer={(event) => props.onChange(ele.id)} 
        />
      );
    });

    // const interviewerClass = ("interviewers__header");

    return ( <ul className={interviewerListClass}>
    {interviewrChecker}
    </ul>
    );
  }