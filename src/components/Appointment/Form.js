import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewList";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel } = props;
  const [username, setUsername] = useState(name || "");
  const [director, setInterviewer] = useState(interviewer || null);

  const reset = function() {
    setUsername("");
    setInterviewer(null);
  }

  const cancel = function() {
      reset();
      onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
            className="appointment__create-input text--semi-bold"
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Student Name"
        />
        </form>
        <p>Interviewer</p>
        <InterviewerList interviewers={interviewers} value={director} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => onSave(username, director)}>Save</Button>
        </section>
    </section>
    </main>
  );
}