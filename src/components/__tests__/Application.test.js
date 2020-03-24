import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getByDisplayValue } from "@testing-library/react";


import Application from "components/Application";

afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"))
    .then(() => fireEvent.click(getByText("Tuesday")))
  
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), { target: { value: "Lydia Miller-Jones" } });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  expect(getByText(appointment, "DELETING")).toBeInTheDocument();
  await waitForElement(() => getByAltText(appointment, "Add"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Lydia Miller-Jones")
  );

  fireEvent.click(getByAltText(appointment, "Edit"));
  expect(getByText(appointment, "Save")).toBeInTheDocument();

  fireEvent.change(getByDisplayValue(appointment, "Lydia Miller-Jones"), { target: { value: "Lydia" } });

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});
