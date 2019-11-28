import React, { Component } from "react";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: "",
      description: ""
    };
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  resetForm = () => {
    this.setState({
      showNewCardForm: false,
      title: "",
      description: ""
    });
  };

  onCreateTask = e => {
    e.preventDefault();
    const { title, description } = this.state;
    this.props.onCreateTask({ title, description });
    this.resetForm();
  };

  toggleForm = () => {
    const { showNewCardForm } = this.state;
    this.setState({ showNewCardForm: !showNewCardForm });
  };

  renderTaskList() {
    const { tasks, onStatusChanged } = this.props;
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChanged={onStatusChanged}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="task-list-header">
          <button className="button button-default" onClick={this.toggleForm}>
            + New Task
          </button>
        </div>
        {this.state.showNewCardForm && (
          <form className="task-list-form" onSubmit={this.onCreateTask}>
            <input
              className="full-width-input"
              onChange={this.onTitleChange}
              value={this.state.title}
              type="text"
              placeholder="title"
            />
            <input
              className="full-width-input"
              onChange={this.onDescriptionChange}
              value={this.state.description}
              type="text"
              placeholder="description"
            />
            <button className="button" type="submit">
              Save
            </button>
          </form>
        )}

        <div className="tasks">
          <div className="task-lists">{this.renderTaskList()}</div>
        </div>
      </div>
    );
  }
}

export default TasksPage;
