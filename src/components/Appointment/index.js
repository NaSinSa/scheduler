import React, { Fragment, useEffect } from "react";

import "./styles.scss";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode  from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    setTimeout(() => {
      Promise.resolve(props.bookInterview(props.id, interview))
        .then(transition(SHOW, true));
    }, 1000)
  };

  function deleteApp() {
    transition(CONFIRM);
  };
  
  function confirm(confirm, cancel) {
    if (confirm) {
      transition(DELETING);
      setTimeout(() => {
        Promise.resolve(props.cancelInterview(props.id))
          .then(transition(EMPTY));
      }, 1000);
    } else if (cancel) {
      transition(SHOW, true);
    }
  };


  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={SAVING} />}
        {mode === DELETING && <Status message={DELETING} />}
        {mode === CONFIRM && (
          <Confirm 
            message={"Delete the appointment?"} 
            onConfirm={confirm}
            onCancel={confirm}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deleteApp}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(CREATE)}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => back(CREATE)}
            onSave={save}
          />
        )}
      </article>
    </>)
  }