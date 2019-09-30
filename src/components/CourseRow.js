import React from 'react'
import { FaFileAlt } from 'react-icons/fa'

const CourseRow = ({ title, seats }) =>
    <tr class="wbdv-row wbdv-course">
                        <td scope="row">
                        <FaFileAlt/>
                        </td>
                        <td><a class="wbdv-row wbdv-title" href="../courseeditor/courseeditor.template.client.html">{title}</a></td>
                        <td class="toHide wbdv-row wbdv-owner">me</td>
                        <td class="toHide wbdv-row wbdv-modified-date">6:45 PM</td>
                        <td></td>
                        <td></td>
                        <td>
                            <button class="btn"><i class="fas fa-times wbdv-row wbdv-button wbdv-delete"></i></button>
                        </td>
                    </tr>
export default CourseRow