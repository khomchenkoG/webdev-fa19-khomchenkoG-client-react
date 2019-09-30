import React from 'react'
import CourseCard from "./CourseCard";
import CourseList from "./CourseList";
import CourseEditor from "./CourseEditor";

export default class WhiteBoard extends React.Component {
    render() {
        return (
            <div>
                <h1>White Board</h1>
                
                <CourseList/>
            </div>
        )
    }
}

