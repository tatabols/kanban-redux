import React, { Component } from "react";
import { connect } from "react-redux";
import TasksPage from "./components/TasksPage";
import { createTask, editTask } from "./actions";

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onStatusChanged = (id, status) => {
    this.props.dispatch(editTask(id, status));
  };

  render() {
    return (
      <TasksPage
        tasks={this.props.tasks}
        onCreateTask={this.onCreateTask}
        onStatusChanged={this.onStatusChanged}
      />
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasks };
};

export default connect(
  mapStateToProps,
  null
)(App);
