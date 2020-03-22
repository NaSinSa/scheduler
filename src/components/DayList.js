import React from "react";

import DayListItem from "./DayListItem";


  export default function DayList(props) {
    const dayChecker = props.days.map((ele) => {
      return <DayListItem id={ele.id} name={ele.name} spots={ele.spots} selected={ele.name === props.day} setDay={props.setDay} />
      })
    
    return ( <ul>
      {dayChecker}
    </ul>
    );
  }