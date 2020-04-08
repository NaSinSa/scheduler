import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  const dayChecker = props.days.map((ele) => {
    return (
      <DayListItem 
        key={ele.id} 
        id={ele.id} 
        name={ele.name} 
        spots={ele.spots} 
        selected={ele.name === props.day}     //ele.name === Monday, Tuesday, ..., Friday
        setDay={props.setDay} 
      />);
    });
  
  return ( <ul> { dayChecker } </ul>);
};