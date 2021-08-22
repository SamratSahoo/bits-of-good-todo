import React, { Component } from "react";
import TodoAdd from "./TodoAdd/TodoAdd";
import TodoTask from "./TodoTask/TodoTask";
import TaskTag from "./TaskTag/TaskTag";
import ToggleButton from "./ToggleButton/ToggleButton";

class TodoPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: [],
            sortDate: false,
            sortComplete: false,
            renderTheSort: false
        }
        this.todoAddRef = React.createRef();
        this.toggleSortDateRef = React.createRef();
        this.toggleSortCompleteRef = React.createRef();
        this.updateTodoList = this.updateTodoList.bind(this);
        this.todoStatusChange = this.todoStatusChange.bind(this);
        this.getSortComplete = this.getSortComplete.bind(this);
        this.getSortDate = this.getSortDate.bind(this);
        this.sortElements = this.sortElements.bind(this);
        this.resetRenderSort = this.resetRenderSort.bind(this);
    }

    async updateTodoList(childTasks){
        await this.setState({
            todoList: childTasks 
        })
        this.forceUpdate();
    }

    componentDidMount(){
        this.todoList = this.todoAddRef.current.state.addedTasks;
        this.setState({
            sortDate: this.toggleSortDateRef.current.props.status,
            sortElements: this.toggleSortCompleteRef.current.props.status 
        })
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

    sortElements(){
       if(this.toggleSortDateRef.current.state.status && this.toggleSortCompleteRef.current.state.status){
           this.setState({
               renderTheSort: true
           });
           var completedArray = [];
           var incompletedArray = [];

           this.state.todoList.forEach((task) => {
               if (task.completed){
                    completedArray.push(task);
               }else{
                   incompletedArray.push(task);
                };
           })
           completedArray.sort(function(a,b){
            return a.selectedDate - b.selectedDate;
           })
            incompletedArray.sort(function(a,b){
                return a.selectedDate - b.selectedDate;
            })

            var sortedBoth = incompletedArray.concat(completedArray);
            this.setState({
                todoList: sortedBoth
            })

            this.forceUpdate()
       } else if(this.toggleSortDateRef.current.state.status){
           var todoListCopy = this.state.todoList;
           todoListCopy = todoListCopy.sort(function(a,b){
            return a.selectedDate - b.selectedDate;
           })
           console.log(todoListCopy);
           this.setState({
            todoList: todoListCopy
        })
        this.forceUpdate()
       }else if(this.toggleSortCompleteRef.current.state.status){
        this.setState({
            renderTheSort: true
        });
        var completedArray = [];
        var incompletedArray = [];
        this.state.todoList.forEach((task) => {
            if (task.completed){
                 completedArray.push(task);
            }else{
                incompletedArray.push(task);
             };
        })
        var sortedBoth = incompletedArray.concat(completedArray);
        this.setState({
            todoList: sortedBoth
        }, this.forceUpdate())  
       }
    }

    todoStatusChange(index){
        var oldTodoList = this.state.todoList;
        var todoItem = oldTodoList[index];
        todoItem.completed = !(todoItem.completed);
        delete oldTodoList[index];
        oldTodoList[index] = todoItem;
        this.setState({
            todoList: oldTodoList
        }, console.log(this.state.todoList))

        }

    getSortComplete(){
        console.log(this.toggleSortCompleteRef.current.state.status)
        this.sortElements()
    }


    getSortDate(){
        console.log(this.toggleSortDateRef.current.state.status)
        this.sortElements()
    }

    resetRenderSort(){
        this.setState({
            renderTheSort: false
        })
    }

    render(){
        return(
            <div className="grid grid-cols-2 gap-8 ml-48 mr-48 mt-24  mb-24">
                {/* Add new task on todo list*/}
                  <div>
                      <TodoAdd ref={this.todoAddRef} updateTodoList={this.updateTodoList} resortList={this.sortElements}></TodoAdd>
                  </div>
                  <div>
                    <div className="grid grid-cols-4">
                    <ToggleButton
                            status={this.state.sortDate}
                            text="Sort by Date"
                            ref={this.toggleSortDateRef}
                            getFunction={this.getSortDate}
                        />
                    <ToggleButton
                            status={this.state.sortComplete}
                            text="Sort by Status"
                            ref={this.toggleSortCompleteRef}
                            getFunction={this.getSortComplete}
                        />
                    </div>
                        {this.state.todoList.map((task, index) => (
                            <TodoTask taskTitle={task.taskTitle} 
                                tags={task.tags} 
                                dueDate={task.dueDate}
                                completed={task.completed}
                                taskId={index}
                                mutateTodo={this.todoStatusChange}
                                sortRender={this.state.renderTheSort}
                                resetSortRender={this.resetRenderSort}   > 
                            </TodoTask>
                        ))}
                        {this.state.todoList.map((task, index) => {
                            console.log("Title: " + task.taskTitle);
                            console.log("Status: " + task.completed)
                            console.log("Date: " + task.dueDate);
                            console.log(this.state.todoList);
                            console.log("====================")
                        })}
                  </div>
            </div>
        )
    }
}
export default TodoPage;