import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getObjectValue } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
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
  
  Promise.resolve(axios.put(`/api/appointments/${id}`, { interview: interview}, { id:id }))
    .then(res => console.log(res))
    .then(
      setState({ 
        ...state,
        appointments
      })
    )
};

function cancelInterview(id) {

  Promise.resolve(axios.delete(`/api/appointments/${id}`))
    .then(res => console.log(res))
    .then(
      setState({
        ...state
      })
    )
};

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </section>
        <section className="schedule">
          {
          state["appointments"].map(ele => {
            const interviewName = getInterview(state, ele.interview)
            return <Appointment 
              key={ele.id} 
              id={ele.id}
              time={ele.time}
              interview={interviewName}
              interviewers={getInterviewersForDay(state, state.day)}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          }) 
          }
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    );
}
