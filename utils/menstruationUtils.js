import moment from "moment";

export function getOvulationDate(lastMenstruationDate, cycleDurations) {
  const ovulationDate = moment(lastMenstruationDate).add(
    cycleDurations - 14,
    "days"
  );

  // if (ovulationDate.isLeapYear()) {
  //   ovulationDate.add(1, "days");
  // }

  const formattedDate = ovulationDate.format("YYYY-MM-DD");
  return { ovulationDate: formattedDate };
}

export function getFecundityPeriod(lastMenstruationDate, cycleDurations) {
  const j1 = parseInt(cycleDurations) - 18;
  const j2 = parseInt(cycleDurations) - 12;

  const startFecondityDate = moment(lastMenstruationDate)
    .add(j1, "days")
    .format("YYYY-MM-DD");
  const endFecondityDate = moment(lastMenstruationDate)
    .add(j2, "days")
    .format("YYYY-MM-DD");

  return {
    startFecondityDate: startFecondityDate,
    endFecondityDate: endFecondityDate,
  };
}

export function getMenstruationPeriod(
  lastMenstruationDate,
  cycleDuration,
  menstruationDuration
) {
  const nextMenstruationDate = moment(lastMenstruationDate).add(
    cycleDuration,
    "days"
  );
  const nextMenstruationEndDate = moment(lastMenstruationDate)
    .add(cycleDuration, "days")
    .subtract(1, "days")
    .add(menstruationDuration, "days");
  return {
    nextMenstruationDate: nextMenstruationDate.format("YYYY-MM-DD"),
    nextMenstruationEndDate: nextMenstruationEndDate.format("YYYY-MM-DD"),
  };
}

export function generateCycleMenstrualData(
  startDate,
  cycleDuration,
  menstruationDuration
) {
  const cyclesData = [];

  let lastMenstruationDate1 = moment(startDate);
  let temp = lastMenstruationDate1;

  for (let i = 0; i < 24; i++) {
    let currentMonth = moment(temp);

    const ovulationDate = getOvulationDate(
      currentMonth.format("YYYY-MM-DD"),
      cycleDuration
    );
    const fecundityPeriod = getFecundityPeriod(
      currentMonth.format("YYYY-MM-DD"),
      cycleDuration
    );
    const menstruationPeriod = getMenstruationPeriod(
      currentMonth.format("YYYY-MM-DD"),
      cycleDuration,
      menstruationDuration
    );

    cyclesData.push({
      month: currentMonth.format("MMMM YYYY"),
      ovulationDate: ovulationDate.ovulationDate,
      fecundityPeriodStart: fecundityPeriod.startFecondityDate,
      fecundityPeriodEnd: fecundityPeriod.endFecondityDate,
      startMenstruationDate: moment(lastMenstruationDate1).format("YYYY-MM-DD"),
      endMenstruationDate: moment(lastMenstruationDate1)
        .add(parseInt(menstruationDuration) - 1, "days")
        .format("YYYY-MM-DD"),
      nextMenstruationDate: menstruationPeriod.nextMenstruationDate,
      nextMenstruationEndDate: menstruationPeriod.nextMenstruationEndDate,
    });

    currentMonth.add(1, "month");
    lastMenstruationDate1 = menstruationPeriod.nextMenstruationDate;
    temp = menstruationPeriod.nextMenstruationDate;
  }

  return cyclesData;
}

export function getUpcomingEvents(currentDate, cycleData) {
  const upcomingEvents = [];

  const currentMoment = moment(currentDate);

  // Loop through the cycle data
  cycleData.forEach((cycle) => {
    const ovulationDate = moment(cycle.ovulationDate);
    const startMenstruationDate = moment(cycle.startMenstruationDate);
    const endMenstruationDate = moment(cycle.endMenstruationDate);

    // Check if the current date or the following dates are within a week of the events
    if (ovulationDate.isBetween(currentMoment, currentMoment.add(7, "days"))) {
      upcomingEvents.push({
        type: "Ovulation",
        date: ovulationDate.format("YYYY-MM-DD"),
        message: `Votre date d'ovulation approche le ${ovulationDate.format(
          "DD MMMM YYYY"
        )}.`,
      });
    }

    if (
      startMenstruationDate.isBetween(
        currentMoment,
        currentMoment.add(7, "days")
      )
    ) {
      upcomingEvents.push({
        type: "Début des règles",
        date: startMenstruationDate.format("YYYY-MM-DD"),
        message: `Le début de vos règles est prévu pour le ${startMenstruationDate.format(
          "DD MMMM YYYY"
        )}.`,
      });
    }

    if (
      endMenstruationDate.isBetween(currentMoment, currentMoment.add(7, "days"))
    ) {
      upcomingEvents.push({
        type: "Fin des règles",
        date: endMenstruationDate.format("YYYY-MM-DD"),
        message: `La fin de vos règles est prévue pour le ${endMenstruationDate.format(
          "DD MMMM YYYY"
        )}.`,
      });
    }
  });

  return upcomingEvents;
}

// Usage example
const cycleData = generateCycleMenstrualData(
  "2024-01-01", // Start date
  28, // Cycle duration in days
  5 // Menstruation duration in days
);

const currentDate = moment().format("YYYY-MM-DD");
const alerts = getUpcomingEvents(currentDate, cycleData);

console.log(alerts);
