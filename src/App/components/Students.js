import React, {Component} from "react";
import "../style/Students.css"
import {Button, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

class Students extends Component {
    state = {
        studentList: [],
        formVisible: false,
        name: ''
    }

    componentDidMount() {
        this.showStudents();
    }

    showStudents = () => {
        // TODO GTB-工程实践: - 请求API的代码应该抽取到一个单独的组件
        const URL = "http://localhost:8080/students";
        fetch(URL, {method: "GET"})
            .then(Response => {
                if (Response.status === 200) {
                    return Response.json();
                } else {
                    // TODO GTB-知识点: - .then的第一个参数是Promise resolved的情况，为什么这里你要自己build一个rejected的Promise？
                    Promise.reject();
                }
            }).then(jsonData => {
            this.setState({
                studentList: jsonData
            })
        })
    }

    addStudent = (event) => {
        // TODO GTB-工程实践: - 以下请求API的代码应该抽取到一个单独的组件
        event.preventDefault();
        let item = {name: this.state.name}
        let header = {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch("http://localhost:8080/students/", header).then(() => this.showStudents());
        this.setState({
            formVisible: false,
            name: '',
        });
    }
    handleInputChange = (e) => {
        this.setState({name: e.target.value});
    };
    // TODO GTB-工程实践: - 方法的名字太宽泛，没有体现业务逻辑
    add = () => {
        this.setState({formVisible: true});
    }

    render() {
        return (
            <div className="student-list">
                <h2>学员列表</h2>
                <div className="content">
                    {/* // TODO GTB-知识点: - 这里可以就用this.state.studentList来做map，为什么要使用Object.keys？*/}
                    {Object.keys(this.state.studentList).map((key) => (
                        <p className="info" key={key}>
                            {`${this.state.studentList[key].id}. ${this.state.studentList[key].name}`}
                        </p>
                    ))}
                    {/* // TODO GTB-完成度: - 不应该在onBlur的时候添加学生*/}
                    {/* // TODO GTB-知识点: - 这里应该使用onKeyUp事件而不是onPressEnter*/}
                    {this.state.formVisible && (<Input
                        type="text"
                        defaultValue="请输入姓名,按回车结束"
                        className="tag-input"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        onBlur={this.addStudent}
                        onPressEnter={this.addStudent}
                    />)}
                    {!this.state.formVisible && (
                        <Button className="add-student" onClick={this.add}><PlusOutlined/>添加学员</Button>)}
                </div>
            </div>
        )
    }
}

export default Students;
