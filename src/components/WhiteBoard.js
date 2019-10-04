import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseCard from "./CourseCard";
import CourseList from "./CourseList";
import CourseEditor from "../Containers/CourseEditor";

export default class WhiteBoard extends React.Component {
    render() {
        return (
        	<Router>
        	 <Route path='/editor/:courseId' component={CourseEditor}/>
             <Route path='/list' component={CourseList}/>


            <div>
                <h1>White Board</h1>
                
                <CourseList/>
            </div>
            </Router>
        )
    }
}

