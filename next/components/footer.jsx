/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
import {Utils,ALL_TODOS,ACTIVE_TODOS,COMPLETED_TODOS} from "../utils/utils";
import {classNames} from '../utils/classnames'
import React from 'react'

export class TodoFooter extends React.Component{
  render () {
    var activeTodoWord = Utils.pluralize(this.props.count, "item");
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}
        >
          Clear completed
        </button>
      );
    }

    var nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
			  href="#/"
			  onClick={()=>this.props.onChangeNowShowing(ALL_TODOS)}
              className={classNames({ selected: nowShowing === ALL_TODOS })}
            >
              All
            </a>
          </li>{" "}
          <li>
            <a
			  href="#/active"
			  onClick={()=>this.props.onChangeNowShowing(ACTIVE_TODOS)}
              className={classNames({
                selected: nowShowing === ACTIVE_TODOS,
              })}
            >
              Active
            </a>
          </li>{" "}
          <li>
            <a
			  href="#/completed"
			  onClick={()=>this.props.onChangeNowShowing(COMPLETED_TODOS)}
              className={classNames({
                selected: nowShowing === COMPLETED_TODOS,
              })}
            >
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
}
