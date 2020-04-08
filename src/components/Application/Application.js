import React from "react";

import "./Application.scss";
import DayList from "../DayList/DayList";
import useApplicationData from "../../hooks/useApplicationData";
import Appointment from "components/Appointment";
import { getInterview, getInterviewersForDay } from "../../helpers/selectors";

export default function Application() {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

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
