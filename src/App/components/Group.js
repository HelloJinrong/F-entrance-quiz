import React, {Component} from "react";
import GroupName from './GroupName';
import GroupMember from "./GroupMember";
import {Button} from 'antd';
import '../style/Group.css';

// TODO GTB-知识点: - 其实，你这个组件应该叫Groups
class Group extends Component {
    state = {
        groupList: [],
    }

    showGroup = () => {
        // TODO GTB-工程实践: - 请求API的代码应该抽取到一个单独的组件
        URL = "http://localhost:8080/groups"
        fetch(URL, {method: "GET"})
            .then(Response => {
                // TODO GTB-知识点: - 建议使用 ===
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
        console.log(this.state.groupList);
        return (
            <div className="group">
                <div className="title">
                    <h2>分组列表</h2>
                    <Button type="primary" type="button" danger onClick={this.showGroup}>
                        分组学员
                    </Button>
                </div>
                <div className="group-content">
                    {
                        this.state.groupList.map((group) => (
                            // TODO GTB-知识点: - 应该再抽取一个组件Group来处理单个Group的逻辑
                            <div className="student-name" key={group.name}>
                                <GroupName
                                    name={group.name}/>
                                <GroupMember students={group.students}/>
                                // TODO GTB-工程实践: - dead code应该删掉
                                {/*{
                                    JSON.toString(group.students)
                                }*/}
                            </div>
                        ))
                    }
                </div>
            </div>
        );

    }
}

export default Group;
