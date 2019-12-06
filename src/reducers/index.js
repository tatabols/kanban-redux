const initialState = {
  tasks: { tasks: [] },
  isLoading: false,
}

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_STARTED':
      console.log('reducer-FETCH_TASKS_STARTED')
      return {
        ...state,
        isLoading: true,
      }

    case 'FETCH_TASKS_SUCCEEDED':
      console.log('reducer-FETCH_TASKS_SUCCEEDED', action.payload)

      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      }

    case 'FETCH_TASKS_FAILED':
      console.log('reducer-FETCH_TASKS_FAILED', action.payload)
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }

    case 'CREATE_TASK_SUCCEEDED':
      return { ...state, tasks: action.payload.task }

    case 'EDIT_TASK_SUCCEEDED':
      const { payload } = action
      const nextTasks = state.tasks.map(task => {
        if (task.id === payload.task.id) {
          return payload.task
        }

        return task
      })

      return {
        ...state,
        tasks: nextTasks,
      }
    default:
      break
  }

  return state
}

export default tasks
