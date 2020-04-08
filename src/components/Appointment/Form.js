import React, { useState } from "react";

import Button from "components/Button/Button";
import InterviewerList from "components/InterviewList/InterviewList";

export default function Form(props) {
  const { name, interviewers, interviewer, onSave, onCancel, edit } = props;
  const [username, setUsername] = useState(name || "");
  const [director, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setUsername("");
    setInterviewer(null);
  };

  const cancel = function() {
      reset();
      onCancel();
  };

  function validate() {
    if (username === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (director === null) {
      setError("You should select an interviewer");
      return;
    }
  
    onSave(username, director, edit);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <p>Interviewer</p>
        <InterviewerList interviewers={interviewers} value={director} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}