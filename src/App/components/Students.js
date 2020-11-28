import React, {useState,useEffect} from "react";
import "../style/Students.css"
import {Button, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';


export default function Students()
{
    const [studentList,setStudentList]=useState([]);
    const [formVisible,setVisible]=useState(false);
    const [name,setName]=useState('')
    useEffect(()=>{showStudents()},[])

  function showStudents() {
        const URL = "http://localhost:8080/students";
        fetch(URL, {method: "GET"})
            .then(Response => {
                if (Response.status === 200) {
                    return Response.json();
                } else {
                    Promise.reject();
                }
            }).then(jsonData => {
            setStudentList(jsonData)
        })
    }

    function addStudent (event) {
        event.preventDefault();
        let header = {
            method: "POST",
            body: JSON.stringify(name),
            headers: {
                'content-type': 'application/json'
            }
        }
        fetch("http://localhost:8080/students/", header).then(() => showStudents());
        setVisible(false)
        setName('')
    }

        return (
            <div className="student-list">
                <h2>学员列表</h2>
                <div className="content">
                    {Object.keys(studentList).map((key) => (
                        <p className="info" key={key}>
                            {`${studentList[key].id}. ${studentList[key].name}`}
                        </p>
                    ))}
                    {formVisible && (<Input
                        type="text"
                        defaultValue="请输入姓名,按回车结束"
                        className="tag-input"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        onBlur={addStudent}
                        onPressEnter={()=>{setVisible(true)}}
                    />)}
                    {!formVisible && (
                        <Button className="add-student" onClick={()=>{setVisible(true)}}><PlusOutlined/>添加学员</Button>)}
                </div>
            </div>
        )

}

