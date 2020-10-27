import React, {Component} from "react";
import '../style/GroupName.css'


class GroupName extends Component {
    state = {
        name: this.props.name
    }

    render() {
        return (
            <h3>{this.state.name}</h3>
        );
    }
}

export default GroupName;
