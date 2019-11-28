import { uniqueId } from "../actions";

const mockTasks = [
  {
    id: uniqueId(),
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    status: "In Progress"
  },
  {
    id: uniqueId(),
    title: "Peace on Earth",
    description: "No big deal.",
    status: "In Progress"
  },
  {
    id: uniqueId(),
    title: "Go trip",
    description: "Yeah",
    status: "Unstarted"
  }
];

const tasks = (state = { tasks: mockTasks }, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return { tasks: [...state.tasks, action.payload] };

    case "EDIT_TASK":
      const { payload } = action;
      const newState = [...state.tasks];
      return {
        tasks: newState.map(task => {
          if (task.id === payload.id) {
            task.status = payload.params;
          }
          return task;
        })
      };

    default:
      break;
  }

  return state;
};

export default tasks;
