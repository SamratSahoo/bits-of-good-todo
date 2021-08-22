import { Component } from "react";
import Button from "@material-tailwind/react/Button";

class ToggleButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: this.props.status
        }

        this.changeStatus = this.changeStatus.bind(this);
    }
    changeStatus(){
        this.setState({
            status: !this.state.status
        })
        this.props.getFunction(this.state.status)
    }

    render(){
        let buttonHTML;
        if (!this.state.status){
            buttonHTML = <Button color="red" buttonType="filled" size="sm" rounded={false} block={false} iconOnly={false}
            ripple="light" onClick={this.changeStatus} className="mr-4 mb-3"> {this.props.text} </Button>

        }else{
            buttonHTML = <Button color="green" buttonType="filled" size="sm" rounded={false} block={false} iconOnly={false}
            ripple="light" onClick={this.changeStatus} className="mr-4 mb-3"> {this.props.text} </Button>
        }
        return (
            <div>
                {buttonHTML}
            </div>
        )
    }

}

export default ToggleButton;