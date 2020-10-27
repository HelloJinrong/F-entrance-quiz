import React, {Component} from "react";
import "../style/Students.css"
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


class Students extends Component {
    state = {
        studentList: []
    }

    componentDidMount() {
        URL = "http://localhost:8080/students"
        fetch(URL, {method: "GET"})
            .then(Response => {
                if (Response.status == 200) {
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

    render() {
        return (
            <div className="student-list">
                <h2>学员列表</h2>
                <div className="content">
                    {Object.keys(this.state.studentList).map((key) => (
                        <p className="info" >
                            {`${this.state.studentList[key].id}. ${this.state.studentList[key].name}`}
                        </p>
                    ))}
                    <Button className="add-student"><PlusOutlined />添加学员</Button>
                </div>

            </div>
        )
    }
}
export default Students;
