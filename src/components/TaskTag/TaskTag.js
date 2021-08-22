import { Component } from "react"; 
import "./TaskTag.css";
import {FaTrashAlt} from "react-icons/fa";

class TaskTag extends Component{
    constructor(props){
        super(props);
        this.state = {
            deleted: false
        }
    }

    deleteTag(){
        this.setState({
            deleted: true
        })
    }

    render(){
        return(
            <div className="grid-container shadow-sm rounded-lg mt-2 border-1">
                <div className="grid-child ml-2 mt-1 mb-1">
                    {this.props.tagName}
                </div>
                <button className="grid-child" onClick={() => this.props.removeTag(this.props.tagName)}>
                    <FaTrashAlt className="m-2"/>
                </button>
            </div>
        )
    }
}

export default TaskTag;