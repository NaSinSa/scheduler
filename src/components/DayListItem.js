import React from "react";

import "components/DayListItem.scss";

const className = require('classnames');

  export default function DayListItem(props) {
    const {name, spots, selected, setDay} = props;
    const dayClass = className("day-list__item", {
      "day-list__item--selected": selected,
      "day-list__item--full": !spots
    });

    const formatSpots = function(spots) {
      let plural = "";
      if (spots > 1) {
        plural += "s"
        return `${spots} spot${plural} remaining`
      } else if (spots === 1) {
        return `${spots} spot${plural} remaining`
      } else {
        return "no spots remaining"
      }
    }

    return (
      <li className={dayClass} onClick={() => setDay(name)} data-testid="day" >
        <h2 className="text--regular">{name}</h2> 
        <h3 className="text--light">{formatSpots(spots)}</h3>
      </li>
    );
  }