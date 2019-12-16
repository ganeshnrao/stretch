import { updateField, getField } from "vuex-map-fields";
import generateActions from "@/services/generateActions";
import { uuid } from "@/services/utils";

const savedExercises = localStorage.getItem("exercises");
const savedHistory = localStorage.getItem("history");

const exercises = savedExercises
  ? JSON.parse(savedExercises)
  : [
      {
        id: uuid(),
        include: true,
        name: "Single knee to chest",
        hold: 30,
        repeat: 3,
        rest: 0,
        alternate: true
      },
      {
        id: uuid(),
        include: true,
        name: "Both knees to chest",
        hold: 30,
        repeat: 3,
        rest: 5,
        alternate: false
      },
      {
        id: uuid(),
        include: true,
        name: "Leg raise with band",
        hold: 30,
        repeat: 3,
        rest: 0,
        alternate: true
      },
      {
        id: uuid(),
        include: true,
        name: "Pelvic tilt and bent leg lift",
        hold: 5,
        repeat: 10,
        rest: 0,
        alternate: true
      },
      {
        id: uuid(),
        include: true,
        name: "Bridge with leg raise",
        hold: 5,
        repeat: 10,
        rest: 0,
        alternate: true
      },
      {
        id: uuid(),
        include: true,
        name: "Lower trunk rotation",
        hold: 5,
        repeat: 10,
        rest: 0,
        alternate: true
      }
    ];

const history = savedHistory ? JSON.parse(savedHistory) : [];

let timerId = null;

function clearTimer() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
}

function sleep(duration) {
  clearTimer();
  return new Promise(resolve => {
    timerId = setTimeout(resolve, duration * 1000);
  });
}

function speak(message) {
  return new Promise(resolve => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
    utterance.onend = resolve;
  });
}

function clear() {
  clearTimer();
  window.speechSynthesis.cancel();
}

export function state() {
  return {
    exercises,
    history,
    currentActionIndex: -1,
    playing: false
  };
}

export const mutations = {
  updateField,

  ADD(state) {
    state.exercises.push({
      id: uuid(),
      include: true,
      name: "",
      hold: 0,
      repeat: 0,
      rest: 0,
      alternate: false
    });
  },

  COMPLETED(state) {
    state.history.push({
      dateMs: Date.now(),
      exercises: state.exercises.map(e => e.name)
    });
    localStorage.setItem("history", JSON.stringify(state.history));
  },

  DELETE_EXERCISE(state, exerciseId) {
    state.exercises = state.exercises.filter(exercise => {
      return exercise.id !== exerciseId;
    });
  },

  TOGGLE_PLAYING(state, playing) {
    if (playing === undefined) {
      state.playing = !state.playing;
    } else {
      state.playing = playing;
    }
    state.currentActionIndex = -1;
  },

  MOVE_EXERCISE(state, { id, direction }) {
    const { exercises } = state;
    const before = [];
    const after = [];
    let exercise;
    exercises.forEach(e => {
      if (e.id === id) {
        exercise = e;
        return;
      }
      if (!exercise) {
        before.push(e);
      } else {
        after.push(e);
      }
    });
    if (!exercise) {
      return;
    }
    if (direction === -1) {
      const last = before.pop();
      before.push(exercise);
      before.push(last);
    } else {
      const first = after.shift();
      after.unshift(exercise);
      after.unshift(first);
    }
    state.exercises = [...before, ...after];
  },

  NEXT(state) {
    state.currentActionIndex += 1;
  },

  SAVE(state) {
    const jsonData = JSON.stringify(state.exercises);
    localStorage.setItem("exercises", jsonData);
  },

  SKIP_TO(state, index) {
    clear();
    state.currentActionIndex = index - 1;
  }
};

export const getters = {
  getField,

  actions(state) {
    return generateActions(state.exercises);
  },

  currentAction(state, getters) {
    return getters.actions[state.currentActionIndex];
  }
};

export const actions = {
  togglePlaying({ commit, dispatch }) {
    commit("TOGGLE_PLAYING");
    dispatch("gotoNextAction");
  },

  add({ commit }) {
    commit("ADD");
  },

  async gotoNextAction({ commit, state, dispatch, getters }) {
    if (!state.playing) {
      return;
    }
    commit("NEXT");
    const { currentAction } = getters;
    if (currentAction) {
      const { message, duration } = currentAction;
      await speak(message);
      if (duration) {
        await sleep(duration);
      }
      dispatch("gotoNextAction");
    } else {
      commit("COMPLETED");
      commit("TOGGLE_PLAYING", false);
    }
  },

  deleteExercise({ commit }, exerciseId) {
    commit("DELETE_EXERCISE", exerciseId);
  },

  save({ commit }) {
    commit("SAVE");
  },

  move({ commit }, { id, direction }) {
    commit("MOVE_EXERCISE", { id, direction });
  },

  skipTo({ commit, dispatch }, index) {
    commit("SKIP_TO", index);
    dispatch("gotoNextAction");
  }
};
