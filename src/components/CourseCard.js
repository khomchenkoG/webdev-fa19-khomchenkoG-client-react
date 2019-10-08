import React from 'react'
import { FaTimes } from 'react-icons/fa';

const CourseCard = ({ course, callBack }) =>
    <div className="column col-xs-1 col-lg-2">   
            <div className="card course-card">
                <img className="card-img-top"
                     src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <td>
        <button onClick={callBack.bind(this, course.id)}> <FaTimes/> </button>
        </td>
                </div>
               </div>
            </div>
export default CourseCard;