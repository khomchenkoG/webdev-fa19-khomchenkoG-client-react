import React from 'react'

const LessonTabs = ({lessons}) =>
    <div>
        <ul className="nav nav-tabs">
            {
                lessons.map(lesson =>
                    <li key={lesson.id} className="nav-item">
                        <a className={lesson.selected ? 'nav-link active' :  'nav-link'} href="#">
                            {lesson.title}
                        </a>
                    </li>
                )
            }
        </ul>
    </div>

export default LessonTabs