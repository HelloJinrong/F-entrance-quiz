import React,{Component} from "react";
import '../style/GroupMember.css'

class GroupMember extends Component{
    state ={
        student: this.props.student
    }
    render() {
        return(
            <div className="group-info">
                {
                    Object.keys(this.state.student).map((key)=>(
                        <p className="info">
                            {`${this.state.student[key].id}.
                    ${this.state.student[key].name}`}</p>
                    ))
                }
            </div>
        )
    }
}
export default GroupMember;
