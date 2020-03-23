import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getObjectValue } from "../helpers/selectors";
import { func } from "prop-types";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
    // trigger: 0
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev, 
        days: all[0]["data"], 
        appointments: getAppointmentsForDay({...prev, days: all[0]["data"], appointments: all[1]["data"], interviewers: all[2]["data"]}, state.day),
        interviewers: all[2]["data"]
      }))
    })
  },[state.day]);

  const setDay = day => setState({ ...state, day });

  function spotCalculator (id, boolean = false) {

    let spot = 0;
    boolean ? spot-- : spot++;
    const days = state.days.filter(ele => {
      return [ele.appointments.find(appId => appId === id) ? ele.spots += spot : null, ele]
    });
    return setState({...state, days});
  };

  function bookInterview(id, interview) {
    const [appointments, index] = getObjectValue(state.appointments, interview, id);
    spotCalculator(id, true);
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(res => console.log(res))
      .then(() => {
        setState({ 
          ...state,
          appointments,
        })
      })
  };
  
  function cancelInterview(id) {
    spotCalculator(id);
    return axios.delete(`/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      setState({
        ...state,
      })
    })
  };
  
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;