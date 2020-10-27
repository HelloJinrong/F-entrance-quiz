import React, {Component} from "react";
import GroupName from './GroupName';
import GroupMember from "./GroupMember";
import {Button} from 'antd';
import '../style/Group.css';

class Group extends Component {
    state = {
        groupList: {},
    }

    showGroup=()=> {
        URL = "http://localhost:8080/groups"
        fetch(URL, {method: "GET"})
            .then(Response => {
                if (Response.status == 200) {
                    return Response.json();
                } else {
                    Promise.reject();
                }
            })
            .then(jsonData => {
                this.setState({
                    groupList: jsonData,
                })
            })
    }

    render() {
        return (
            <div className="group">
                <div className="title">
                    <h2>分组列表</h2>
                    <Button type="primary" type="button" danger onClick={this.showGroup}  >
                        分组学员
                    </Button>
                </div>
                <div className="group-content">
                    {
                        Object.keys(this.state.groupList).map((key) => (
                            <div className="student-name">
                                <GroupName
                                    name={this.state.groupList[key].name}/>
                                <GroupMember student={this.state.groupList[key].students}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        );

    }
}

export default Group;
