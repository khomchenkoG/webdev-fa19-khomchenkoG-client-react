import React from 'react'
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import CourseService from '../services/CourseService';
import ModuleListContainer from '../Containers/ModuleListContainer';

let courseService = CourseService.getInstance();


const CourseEditor = ({ match }) => {
    // let selectedCourse = courseService
    //     .findCourseById(match.params.courseId);
    // console.log(selectedCourse);
    return <div>
        <h2>Course Editor {match.params.courseId}</h2>
        <div className="row">
            <div className="col-3">
                <ModuleListContainer course={courseService
        .findCourseById(match.params.courseId)}/>
                {/*<ModuleList 
                course={courseService
        .findCourseById(match.params.courseId)}/>*/}
            </div>
            <div className="col-9">
                
            </div>
        </div>
    </div>;
};





export default CourseEditor