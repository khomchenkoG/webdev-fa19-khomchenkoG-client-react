import React from 'react'
import CourseRow from "./CourseRow";
import Courses from '../services/Courses';


export default class CourseList extends React.Component {
    render () {
        return (
            <div class="table-container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th class="wbdv-header wbdv-title" scope="col">Title</th>
                    <th class="toHide wbdv-header wbdv-owner" scope="col">Owned by</th>
                    <th class="toHide wbdv-header wbdv-last-modified" scope="col">Last modified by me</th>
                    <th class="toHide wbdv-button wbdv-grid-layout" scope="col">
                        <button class="btn wbdv-field wbdv-hamburger"><i class="fas fa-grip-horizontal"></i></button>
                    </th>
                    <th class="toHide wbdv-header wbdv-sort" scope="col">
                        <button class="btn"><i class="fas fa-sort-alpha-down"></i></button>
                    </th>
                </tr>
            </thead>
            <tbody class = "table-body">

                {
                    Courses.map(course =>

                        <CourseRow
                            course={course}/>
                    )
                }
            </tbody>
        </table>
    </div>
            )
    }
}
    

