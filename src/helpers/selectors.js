export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);
  if (filteredDay.length !== 0) {
    return filteredDay[0]["appointments"].map(ele => state["appointments"][ele]);
  } else {
    return [];
  }
};
