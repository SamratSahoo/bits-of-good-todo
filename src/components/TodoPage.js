import React, { Component } from "react";
import TodoAdd from "./TodoAdd/TodoAdd";
import TodoTask from "./TodoTask/TodoTask";
import TaskTag from "./TaskTag/TaskTag";

class TodoPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: []
        }
        this.todoAddRef = React.createRef();
        this.updateTodoList = this.updateTodoList.bind(this);
    }

    async updateTodoList(childTasks){
        await this.setState({
            todoList: childTasks 
        })
        this.forceUpdate();
    }

    componentDidMount(){
        this.todoList = this.todoAddRef.current.state.addedTasks;
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.todoList.length !== this.state.todoList.length){
            return true;
        }else {
            for(const [index, element] of this.state.todoList.entries()){
                if (JSON.stringify(nextState.todoList[index]) !==  JSON.stringify(element)){
                    return true;
                }
            }
        }
        return false;
    }
    sortByDate(){

    }
    render(){
        return(
            <div className="grid grid-cols-2 gap-8 ml-48 mr-48 mt-24  mb-24">
                {/* Add new task on todo list*/}
                  <div>
                      <TodoAdd ref={this.todoAddRef} updateTodoList={this.updateTodoList}></TodoAdd>
                  </div>
                  <div>
                      {this.state.todoList.map((task, index) => (
                          <TodoTask taskTitle={task.taskTitle} 
                            tags={task.tags} 
                            dueDate={task.dueDate}>    
                          </TodoTask>
                      ))}
                  </div>
            </div>
        )
    }
}
export default TodoPage;