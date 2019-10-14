import React from 'react'
import CourseCard from "../components/CourseCard";
import ListContainer from './ListContainer';
import { FaBars } from 'react-icons/fa';
import { FaGripHorizontal } from 'react-icons/fa';
import { FaSortAlphaDown } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import '../CSS/cardView.css'

const CardContainer = ({ courses, switchCallBack, deleteCallBack }) => {

    return (
        <div class = "container-fluid">
        <nav class="navbar">
            <div>
                <a clsass= "nav-title"> Recent Documents </a>
                </div>
    
            <div>
                <button onClick={switchCallBack.bind(this, ListContainer)}>
                        <FaBars/></button>
            </div>
        </nav>
               <div class="row">
            {
                    courses.map((course) =>

                        <CourseCard
                            course={course}
                            callBack={deleteCallBack}/>
                    )
               }
            </div>
            </div>

    )


}

export default CardContainer;