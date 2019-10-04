import React from 'react'
import {Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import CourseEditor from '../Containers/CourseEditor';

const CourseRow = ({ course}) =>
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
                            <button class="btn"><i class="fas fa-times wbdv-row wbdv-button wbdv-delete"></i></button>
                        </td>
                    </tr>
export default CourseRow;