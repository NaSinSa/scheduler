import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

// const state = {
//     day: "Monday",
//     days: [
//         {
//           id: 1,
//           name: "Monday",
//           spots: 2,
//         },
//         {
//           id: 2,
//           name: "Tuesday",
//           spots: 5,
//         },
//         {
//           id: 3,
//           name: "Wednesday",
//           spots: 0,
//         },
//       ],
//     appointments: [
//       {
//         id: 1,
//         time: "12pm",
//         interview: null
//       },
//       {
//         id: 2,
//         time: "1pm",
//         interview: {
//           student: "Lydia Miller-Jones",
//           interviewer: {
//             id: 1,
//             name: "Sylvia Palmer",
//             avatar: "https://i.imgur.com/LpaY82x.png",
//           }
//         }
//       }
//     ],
//     interviewers: {
//       "1": { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//       "2": { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//       "3": { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//       "4": { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//       "5": { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
//     },

// }

describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  });