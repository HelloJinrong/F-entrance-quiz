import React, {Component} from "react";
import '../style/GroupMember.css'

class GroupMember extends Component {

    render() {
        return (
            <div className="group-info">
                {
                    this.props.students.map((student) => (
                        <p className="info" key={student.id}>
                            {student.id}.
                            {student.name}</p>
                    ))
                }
            </div>
        )
    }
}

export default GroupMember;
