function generateActionsForOne(exercise) {
  const { name, include, hold, repeat, rest, alternate } = exercise;
  if (!name || !include) {
    return [];
  }
  const actions = [{ message: `Prepare for ${name}`, duration: 5 }];
  const totalRepeat = repeat * (alternate ? 2 : 1);
  for (let i = 0; i < totalRepeat; i++) {
    const isLastOne = i === totalRepeat - 1;
    const message = isLastOne ? "Last one, start" : "Start";
    actions.push({ message, duration: hold });
    if (isLastOne) {
      break;
    }
    if (alternate) {
      actions.push({ message: "Switch side", duration: 3 });
    } else if (rest) {
      actions.push({ message: "Rest", duration: rest });
    }
  }
  actions.push({ message: "Done", duration: 5 });
  return actions;
}

export default function generateActions(exercises) {
  const actions = exercises.reduce(
    (acc, exercise) => {
      const { name } = exercise;
      const actions = generateActionsForOne(exercise);
      actions.forEach(action => acc.push({ name, ...action }));
      return acc;
    },
    [{ message: "Prepare for exercises", duration: 10 }]
  );
  actions.push({ message: "All done! Good job!" });
  return actions;
}
