import React from 'react'
import CourseCard from "../components/CourseCard";
import ListContainer from './ListContainer';
import { FaBars } from 'react-icons/fa';
import { FaGripHorizontal } from 'react-icons/fa';
import { FaSortAlphaDown } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

const CardContainer = ({courses ,callback}) => {

return (<table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th class="wbdv-header wbdv-title" scope="col">Title</th>
                    <th class="toHide wbdv-header wbdv-owner" scope="col">Owned by</th>
                    <th class="toHide wbdv-header wbdv-last-modified" scope="col">Last modified by me</th>
                    <th class="toHide wbdv-button wbdv-grid-layout" scope="col">
                        <button onClick={callback.bind(this, ListContainer)}>
                        <FaGripHorizontal/></button>
                    </th>
                    <th class="toHide wbdv-header wbdv-sort" scope="col">
                        <button class="btn"><FaSortAlphaDown/></button>
                    </th>
                </tr>
            </thead>
            <div class="card-group">
            {
                    courses.map((course) =>

                        <CourseCard
                            course={course}/>
                    )
               }

            </div>
           </table>
           )
}

export default CardContainer;
