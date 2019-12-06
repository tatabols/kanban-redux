import * as api from '../api'

let _id = 1
export const uniqueId = () => {
  return _id++
}

export const createTask = ({
  title,
  description,
  status = 'Unstarted',
}) => dispatch => {
  api.createTask({ title, description, status }).then(resp => {
    dispatch(createTaskSucceeded(resp.data))
  })
}

export const createTaskSucceeded = task => {
  return { type: 'CREATE_TASK_SUCCEEDED', payload: { task } }
}

export const fetchTasksStarted = () => {
  return {
    type: 'FETCH_TASKS_STARTED',
  }
}

const getTaskById = (tasks, id) => {
  return tasks.find(task => task.id === id)
}

const progressTimerStart = taskId => {
  return { type: 'TIMER_STARTED', payload: { taskId } }
}

export const editTask = (id, params = {}) => (dispatch, getState) => {
  const task = getTaskById(getState().tasks.tasks, id)
  task.status = params
  console.log('editTask', id, task)

  api.editTask(id, task).then(resp => {
    console.log('editTaskSucceeded', resp.data)

    dispatch(editTaskSucceeded(resp.data))
    if (resp.data.status === 'In Progress') {
      dispatch(progressTimerStart(resp.data.id))
    }
  })
}

export const editTaskSucceeded = task => {
  console.log('editTaskSucceeded', task)

  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task,
    },
  }
}

// export const fetchTasks = () => dispatch => {
//   dispatch(fetchTasksStarted())
//   api
//     .fetchTasks()
//     .then(resp => {
//       setTimeout(() => {
//         dispatch(fetchTasksSucceeded(resp.data))
//       }, 2000)
//     })
//     .catch(e => {
//       dispatch(fetchTasksFailed(e.message))
//     })
// }

// export const fetchTasksSucceeded = tasks => {
//   return {
//     type: 'FETCH_TASKS_SUCCEEDED',
//     payload: {
//       tasks,
//     },
//   }
// }

// export const fetchTasksFailed = error => {
//   return {
//     type: 'FETCH_TASKS_FAILED',
//     payload: {
//       error,
//     },
//   }
// }
