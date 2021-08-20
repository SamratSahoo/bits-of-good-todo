import { Component } from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import "./TodoAdd.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PrettyCalendar from "../PrettyCalendar/PrettyCalendar"

class TodoAdd extends Component{
    constructor(){
        super();
        this.state = {
            tags: ["Not Started", "In Progress", "Completed"],
            taskTitle: null,
            addedTag: null,
            selectedTag: null,
            value: new Date()
        }
        this.handleTaskTitle = this.handleTaskTitle.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this); 
        this.addTagToList = this.addTagToList.bind(this);
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
        this.setState({ 
            tags: this.state.tags.concat([this.state.addedTag])
          })
          this.setState({
            addedTag: ""
        })
    }

    render(){
        return(
        <div className="shadow-xl box-border border-4 border-yellow-400 p-4 rounded-2xl">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
                    Task Title
                </label>
                <input className="shadow-lg appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Task Title" 
                value={this.state.taskTitle} onChange={this.handleTaskTitle}/>
            </div>
            <hr className="mt-4"></hr>
            <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
                    Choose a Due Date
                </label>
            <PrettyCalendar className="w-full"/>
            <hr className="mt-4"></hr>
            {/* Section 2: Create Custom Tag*/}
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" for="title">
                Create a Tag
            </label>
            <input className="shadow-lg appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Tag Title"
            value={this.state.addedTag} onChange={this.handleAddTag}/>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-bold  rounded-full 
                        mt-4 w-full h-6" onClick={this.addTagToList}>
            Add Tag
            </button>
            <hr className="mt-4 font-normal"></hr>
            <p className="block text-gray-700 text-sm font-bold mb-2 mt-4 text-center">Choose a Tag </p>
            {/* Section 3: Choose a preexisting tag*/}
            <DropdownButton className="mb-2 mt-3 flex justify-center " title="Choose a Tag">
                {this.state.tags.map((tag) => (
                    <Dropdown.Item href="#/action-1">{tag}</Dropdown.Item>
                ))}
            </DropdownButton>
            <hr className="mt-4 font-normal"></hr>            
        </div>

    )}
}

export default TodoAdd;