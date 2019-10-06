import React from 'react'
import CourseRow from "../components/CourseRow";
import CardContainer from './CardContainer';
import { FaBars } from 'react-icons/fa';
import { FaGripHorizontal } from 'react-icons/fa';
import { FaSortAlphaDown } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

const ListContainer = ({courses ,addCallback, deleteCallBack}) => {


return (<table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th class="wbdv-header wbdv-title" scope="col">Title</th>
                    <th class="toHide wbdv-header wbdv-owner" scope="col">Owned by</th>
                    <th class="toHide wbdv-header wbdv-last-modified" scope="col">Last modified by me</th>
                    <th class="toHide wbdv-button wbdv-grid-layout" scope="col">
                        <button onClick={addCallback.bind(this, CardContainer)}>
                        <FaGripHorizontal/></button>
                    </th>
                    <th class="toHide wbdv-header wbdv-sort" scope="col">
                        <button class="btn"><FaSortAlphaDown/></button>
                    </th>
                </tr>
            </thead>
            <tbody class = "table-body">

                {
                    courses.map((course) =>

                        <CourseRow
                            
                            course={course}
                            callback={deleteCallBack}/>
                    )
               }
            </tbody>
        </table>)
}

export default ListContainer;