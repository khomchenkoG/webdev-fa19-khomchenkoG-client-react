import React from 'react'
import CourseRow from "./CourseRow";

const courses = [
    { title: 'Course 1', seats: 123, id: 1 },
    { title: 'Course 2', seats: 234, id: 2 },
    { title: 'Course 3', seats: 345, id: 3 },
    { title: 'Course 4', seats: 456, id: 4 },
    { title: 'Course 5', seats: 567, id: 5 },
]

const CourseList = () =>
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
                    courses.map(course =>
                        <CourseRow
                            key={course.id}
                            title={course.title}
                            seats={course.seats}/>
                    )
                }
                {
                    courses.map(function (course, index) {
                        return <CourseRow
                            key={course.id}
                            title={course.title}
                            seats={course.seats}/>
                    })
                }
            </tbody>
        </table>
    </div>

export default CourseList