import React, { Component } from 'react'
import { connect } from 'react-redux'
import TasksPage from './components/TasksPage'
import { createTask, editTask, fetchTasksStarted } from './actions'
import FlashMessage from './components/FlashMessage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasksStarted())
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }))
  }

  onStatusChanged = (id, status) => {
    this.props.dispatch(editTask(id, status))
  }

  render() {
    return (
      <div className='container'>
        {this.props.error && <FlashMessage message={this.props.error} />}

        <TasksPage
          tasks={this.props.tasks}
          isLoading={this.props.isLoading}
          error={this.props.error}
          onCreateTask={this.onCreateTask}
          onStatusChanged={this.onStatusChanged}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { tasks, isLoading, error } = state.tasks
  return {
    tasks,
    isLoading,
    error,
  }
}

export default connect(mapStateToProps, null)(App)
