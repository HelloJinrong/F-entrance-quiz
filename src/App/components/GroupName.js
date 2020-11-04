import React, {Component} from "react";
import '../style/GroupName.css'

// TODO GTB-知识点: - 这个组件抽取的粒度太小了，有点过度设计了
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
