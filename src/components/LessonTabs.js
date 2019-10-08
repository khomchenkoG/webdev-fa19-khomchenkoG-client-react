import React from 'react'
import '../CSS/courseEditor.css'

const LessonTabs = ({ lessons, callBack, activeLesson }) => 
<div>
        <ul className="nav nav-pills ">
            {
                
                lessons.map(lesson => {
                    let isActive = lesson.id == activeLesson;
                    return (<li key={lesson.id} 
                        className={isActive ? "nav-item active-lesson" : "nav-item lesson-tab"}>
                        <a className='nav-link' 
                        href="#"
                        onClick = {callBack.bind(this, lesson.id)}>
                            {lesson.title}
                        </a>
                    </li>)

                }
                    
                )
            }
            <form className="form-inline create-lesson">
        <div className="form-group mx-sm-1 mb-2">
          <input type="password" className="form-control take-full-width take-full-height" placeholder="New Lesson" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Create</button>
      </form>
        </ul>
    </div>

export default LessonTabs