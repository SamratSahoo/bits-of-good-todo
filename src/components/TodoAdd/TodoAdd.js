import { Component } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./TodoAdd.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskTag from "../TaskTag/TaskTag";

class TodoAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            taskTitle: null,
            addedTag: null,
            selectedDate: new Date(),
            selectedDateString: null,
            errorMessage: null,
            // Array of tasks referenced by parent component
            addedTasks: []
        }
        this.tasks = [];
        this.handleTaskTitle = this.handleTaskTitle.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this); 
        this.handleDateChange = this.handleDateChange.bind(this); 
        this.addTagToList = this.addTagToList.bind(this);
        this.submitInfo = this.submitInfo.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    handleTaskTitle(e){
        this.setState({
            taskTitle: e.target.value
        })
    }

    handleAddTag(e){
        this.setState({
            addedTag: e.target.value
        })
    }

    addTagToList(){
        let tempTags = this.state.tags;
        tempTags.push(this.state.addedTag);
        this.setState({ 
            tags: tempTags
          })
          this.setState({
            addedTag: ""
        })

    }

    handleDateChange(value, event){
        this.setState({
                selectedDateString: value.toISOString().split('T')[0],
                selectedDate: value,
                dateChanged: true
            })
    }

    async submitInfo(){
        if (this.state.taskTitle == null || this.state.selectedDateString == null){
            this.setState({
                errorMessage: "You must set a title and due date!"
            })
        }else{
            await this.tasks.push({
                    taskTitle: this.state.taskTitle,
                    dueDate: this.state.selectedDateString,
                    tags: this.state.tags,
                    selectedDate: this.state.selectedDate,
                    completed: false
                })
            this.setState({ addedTasks: this.tasks })
            // Reset Form State
            this.setState({
                tags: [],
                taskTitle: null,
                addedTag: null,
                selectedDate: new Date(),
                selectedDateString: null,
                errorMessage: null,
            })
            document.getElementById("taskTitle").value = "";
            document.getElementById("tagInput").value = "";
            this.props.updateTodoList(this.tasks);
            this.props.resortList();
        }
    }

    componentDidUpdate(){
        // this.props.updateTodoList(this.tasks);
    }

    removeTag(tagToRemove){
        let tagArray = this.state.tags;
        tagArray = tagArray.filter(function(item){
            return item !== tagToRemove
        })

        this.setState({
            tags: tagArray
        })
    }


    render(){
        let error;
        if (this.state.errorMessage != null){
            error = <div className="mt-2 text-center text-red-600 font-bold">{this.state.errorMessage}</div>;
        }else{
            error = <div></div>;
        }
        return(
        <div className="shadow-xl box-border border-4 border-yellow-400 p-4 rounded-2xl">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Title (Required)
                </label>
                <input className="shadow-lg appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline" id="taskTitle" type="text" placeholder="Task Title" 
                value={this.state.taskTitle} onChange={this.handleTaskTitle}/>
            </div>
            <hr className="mt-4"></hr>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                    Choose a Due Date (Required)
                </label>
                <Calendar
                        onChange={this.handleDateChange}
                        value={this.state.selectedDate}
                    />
            <hr className="mt-4"></hr>
            {/* Section 2: Create Custom Tag*/}
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                Add a Tag (Optional)
            </label>
            <input className="shadow-lg appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Tag Name" id="tagInput"
            value={this.state.addedTag} onChange={this.handleAddTag}/>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-bold  rounded-lg 
                        mt-4 w-full h-8" onClick={this.addTagToList}>
            Add Tag
            </button>
            {this.state.tags.map((tag, index) => (
                <TaskTag key={index} tagName={tag} removeTag={this.removeTag}/>
            ))}
            <hr className="mt-4 font-normal"></hr>   
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-bold  rounded-lg 
                        mt-2 w-full h-8" onClick={this.submitInfo}>
            Submit Task
            </button>
            {error}
        </div>
    )}
}

export default TodoAdd;