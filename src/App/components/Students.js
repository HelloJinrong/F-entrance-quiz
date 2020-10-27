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
        const URL = "http://localhost:8080/students";
        fetch(URL, {method: "GET"})
            .then(Response => {
                if (Response.status === 200) {
                    return Response.json();
                } else {
                    Promise.reject();
                }
            }).then(jsonData => {
            this.setState({
                studentList: jsonData
            })
        })
    }

    addStudent = (event) => {
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

    add = () => {
        this.setState({formVisible: true});
    }

    render() {
        return (
            <div className="student-list">
                <h2>学员列表</h2>
                <div className="content">
                    {Object.keys(this.state.studentList).map((key) => (
                        <p className="info">
                            {`${this.state.studentList[key].id}. ${this.state.studentList[key].name}`}
                        </p>
                    ))}
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
