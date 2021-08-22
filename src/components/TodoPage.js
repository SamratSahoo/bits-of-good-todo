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
            sortComplete: false
        }
        this.todoAddRef = React.createRef();
        this.toggleSortDateRef = React.createRef();
        this.toggleSoftCompleteRef = React.createRef();
        this.updateTodoList = this.updateTodoList.bind(this);
        this.todoStatusChange = this.todoStatusChange.bind(this);
        this.getSortComplete = this.getSortComplete.bind(this);
        this.getSortDate = this.getSortDate.bind(this);
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
            sortElements: this.toggleSoftCompleteRef.current.props.status 
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
       if(this.state.sortComplete && this.state.sortDate){
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
            return new Date(b.date) - new Date(a.date);
           })
            incompletedArray.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            })

            var sortedBoth = completedArray.concat(incompletedArray);
            this.setState({
                todoList: sortedBoth
            })
       }else if(this.state.sortDate){
           var todoListCopy = this.state.todoList;
           todoListCopy.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
           })
           this.setState({
            todoList: todoListCopy
        })
       }else if(this.state.sortComplete){
        this.state.todoList.forEach((task) => {
            if (task.completed){
                 completedArray.push(task);
            }else{
                incompletedArray.push(task);
             };
        })

        var sortedBoth = completedArray.concat(incompletedArray);
        this.setState({
            todoList: sortedBoth
        })
        
       }
    }

    todoStatusChange(index){
        console.log(index);
        this.state.todoList[index].completed = !this.state.todoList[index].completed
        console.log(this.state.todoList[index].completed)
    }
    async getSortComplete(sortCompleteVal){
        await this.setState({
            sortComplete: sortCompleteVal,
        })
        console.log(this.state.sortComplete);
        await this.sortElements()
        console.log(this.state.todoList);
    }

    getSortDate(sortDateVal){
        this.setState({
            sortDate: sortDateVal,
        })
        this.sortElements()

    }
    render(){
        return(
            <div className="grid grid-cols-2 gap-8 ml-48 mr-48 mt-24  mb-24">
                {/* Add new task on todo list*/}
                  <div>
                      <TodoAdd ref={this.todoAddRef} updateTodoList={this.updateTodoList}></TodoAdd>
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
                            ref={this.toggleSoftCompleteRef}
                            getFunction={this.getSortComplete}
                        />
                    </div>
                        {console.log(this.state.todoList)}
                        {this.state.todoList.map((task, index) => (
                            <TodoTask taskTitle={task.taskTitle} 
                                tags={task.tags} 
                                dueDate={task.dueDate}
                                completed={task.completed}
                                taskId={index}
                                mutateTodo={this.todoStatusChange}>    
                            </TodoTask>
                        ))}
                  </div>
            </div>
        )
    }
}
export default TodoPage;