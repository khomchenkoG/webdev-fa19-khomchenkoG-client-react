import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import CourseCard from "./CourseCard";
import CourseList from "./CourseList";
import CourseEditor from "../Containers/CourseEditor";

export default class WhiteBoard extends React.Component {
    render() {
        return (
        	<Router>
                <div>
                    <h1>White Board</h1>
                    <Link to='/list'>List</Link>
                    <Route exact path='/editor/:courseId' component={CourseEditor}/>
                </div>
            </Router>
        )
    }
}

