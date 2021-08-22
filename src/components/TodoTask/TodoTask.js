import { Component } from "react";
import TaskTag from "../TaskTag/TaskTag";
import Switch from '@material-ui/core/Switch';
import green from '@material-ui/core/colors/green';

class TodoTask extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags: this.props.tags,
            completed: this.props.completed, 
            sortRender: this.props.sortRender
        }
        this.removeTagTask = this.removeTagTask.bind(this);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
    }

    removeTagTask(tagToRemove){
        let tagArray = this.state.tags;
        tagArray = tagArray.filter(function(item){
            return item !== tagToRemove
        })

        this.setState({
            tags: tagArray
        })
    }

    toggleTaskStatus(){
        this.setState({
            completed: !this.state.completed
        })
        this.props.mutateTodo(this.props.taskId);
    }

    componentDidMount(){
        this.props.resetSortRender();
        this.forceUpdate()
    }
    render(){
        let tagHTML;
        if (this.state.tags.length == 0){
            tagHTML = <div className="text-red-600 font-bold">No Tags</div>
        }else {
            tagHTML = this.state.tags.map((tag) => (
                <TaskTag tagName={tag} removeTag={this.removeTagTask}></TaskTag>
            ))

        }
        let checkType;
        if (this.props.sortRender){
            
            checkType = this.props.completed; 
            console.log("RERE")
        }else{
            checkType = this.state.completed;
            console.log("SESE")
        }
        return(
            <div className="shadow-xl box-border border-4 border-yellow-400 p-4 rounded-2xl mb-3">
            {console.log("CHECK STATUS", this.state.completed, "TASK", this.props.taskTitle)}
            <Switch
                checked={checkType}
                onChange={this.toggleTaskStatus}
                name="completedButton"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
                <label className="block text-gray-700 text-sm font-bold mt-2" for="title">
                    Task Title
                </label>
                <div>{this.props.taskTitle}</div>
                <label className="block text-gray-700 text-sm font-bold mt-2" for="title">
                    Due Date
                </label>
                <div>{this.props.dueDate}</div>
                <label className="block text-gray-700 text-sm font-bold mt-2" for="title">
                    Tags
                </label>
                <div>
                {tagHTML}
                </div>
            </div>
        )
    }
}

export default TodoTask;