import React from 'react'
import ModuleListItem from "./ModuleListItem";

const ModuleList = ({course}) =>
    <div>
        <ul className="list-group">
            {
                course.modules.map(module =>
                    <ModuleListItem
                        key={module.id}
                        module={module}/>
                )
            }
        </ul>
    </div>

export default ModuleList