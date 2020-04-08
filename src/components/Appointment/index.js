import React from "react";

import "./styles.scss";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode  from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";                  //-INGs are notice to users.
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, edit = false) { //edit ? editing, no spot change : new booking, spot--
    const interview = {                            //for bookInterview in useApplicationData.js
      student: name,
      interviewer
    };
    transition(SAVING, false);
    setTimeout(() => {
      props.bookInterview(props.id, interview, edit)
        .then(() => transition(SHOW, true))
        .catch(() => transition(ERROR_SAVE, true))
    }, 1000);
  };

  function deleteApp() {
    transition(CONFIRM, false);
  };
  
  function confirm(confirm) {  //confirm ? yes, delete it : no, don't
    if (confirm) {
      transition(DELETING, false);
      setTimeout(() => {
         props.cancelInterview(props.id)
          .then(() => transition(EMPTY, true))
          .catch(() => transition(ERROR_DELETE, true))
      }, 1000);
    } else {
      transition(SHOW, true);
    }
  };


  return (
    <>
      <article className="appointment" data-testid="appointment">
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
            onCancel={() => back()}
            onSave={save}
            edit={false}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => back(CREATE)}
            onSave={save}
            edit={true}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
            message={"Failed to cancel."}
            onClose={() => back()}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            message={"Failed to book."}
            onClose={() => back()}
          />
        )}
      </article>
    </>
  );
};