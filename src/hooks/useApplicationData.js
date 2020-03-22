import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getObjectValue } from "../helpers/selectors";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
    trigger: 0
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

  function bookInterview(id, interview) {
    const [appointments, index] = getObjectValue(state.appointments, interview, id);
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(res => console.log(res))
      .then(() => {
        setState({ 
          ...state,
          appointments,
          trigger: state.trigger + 1
        })
      })
  };
  
  function cancelInterview(id) {
  
    return axios.delete(`/api/appointments/${id}`)
      .then(res => console.log(res))
      .then(() => {
        setState({
          ...state,
          trigger: state.trigger + 1
        })
      })
  };


  useEffect(() => {
    axios.get("/api/days")
    .then(res => {
      setState(prev => ({
        ...prev, 
        days: res["data"], 
      }))
    })
  }, [state.trigger]);
  
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;