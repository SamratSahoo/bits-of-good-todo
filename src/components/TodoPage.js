import React, { Component } from "react";
import TodoAdd from "./TodoAdd/TodoAdd"

class TodoPage extends Component{
    constructor(){
        super();
    }

    renderRedirect = () => {
        this.setState({ redirect: true });
      };

    render(){
        return(
            <div className="grid grid-cols-2 gap-8 ml-48 mr-48 mt-24  mb-24">
                  <div>
                      <TodoAdd></TodoAdd>
                  </div>
                  <div>9</div>
            </div>
        )
    }
}
export default TodoPage;