import React from 'react'
import '../CSS/moduleTab.css'
import { FaTimes } from 'react-icons/fa';

const ModuleListItem = ({ module, courseId, callBack, deleteModule, activateModule, activeModule }) => {
	let isActive = activeModule == module.id


return (
	<div className={isActive ? "wbdv-module-item module-active" : "wbdv-module-item"} >
	<div class="form-inline">
		<a className= {isActive ? "nav-link module-title-active" : "nav-link module-item-title"}
            onClick = {callBack.bind(this, module.id)}
            href="#" >
              {module.title}
            </a>
         <button onClick = {deleteModule.bind(this, module.id, courseId)} 
              className="btn" style={{float: 'right'}}><FaTimes class="delete-btn" /></button>
	</div>            
</div>
)

}



export default ModuleListItem