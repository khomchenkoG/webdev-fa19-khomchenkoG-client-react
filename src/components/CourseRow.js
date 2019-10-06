import React from 'react'
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import CourseEditor from '../Containers/CourseEditor';

const CourseRow = ({ course, callback }) =>
    <tr class="wbdv-row wbdv-course">
        <td scope="row">
        <FaFileAlt/>
        </td>
        <td>
        <Link to={`/editor/${course.id}`}>
        {course.title}
        </Link>
                  
        </td>
        <td class="toHide wbdv-row wbdv-owner">me</td>
        <td class="toHide wbdv-row wbdv-modified-date">6:45 PM</td>
        <td></td>
        <td></td>
        <td>
        <button onClick={callback.bind(this, {course})}> <FaTimes/> </button>
        </td>
        </tr>
export default CourseRow;