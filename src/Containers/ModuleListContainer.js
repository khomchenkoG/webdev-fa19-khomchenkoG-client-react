import React from 'react'
import ModuleListItem from "../components/ModuleListItem";
import CourseService from "../services/CourseService";
import '../CSS/courseEditor.css'


let courseService = CourseService.getInstance()


export default class ModuleListContainer
extends React.Component {

    constructor(props) {
        super(props)
        this.titleChanged = this.titleChanged.bind(this)
        this.createModule = this.createModule.bind(this)
        this.deleteModule = this.deleteModule.bind(this)
        this.activateModule = this.activateModule.bind(this)
        this.state = {
            newModule: {
                title: ''
            },
            courseId: this.props.course.id,
            modules: this.props.course.modules,
            activeModule: this.props.activeModule,
            moduleChanged: this.props.moduleChanged,
            moduleDeleted: this.props.moduleDeleted
        }
    }

    titleChanged = (event) => {
        this.setState({
            newModule: {
                title: event.currentTarget.value,
                id: (new Date()).getTime()
            }
        })
    }

    deleteModule = (moduleId, courseId) => {
        courseService.deleteModule(moduleId, courseId)
        this.setState(prevState => ({
            courseId: prevState.courseId,
            modules: courseService.findCourseById(prevState.courseId).modules,
            moduleChanged: prevState.moduleChanged,
            moduleDeleted: prevState.moduleDeleted
        }), () => {
            let newModuleId = null;
            if (this.state.modules != []) {
                if (this.state.modules[0]){
                    newModuleId = this.state.modules[0].id
                }  
            }
            this.state.moduleDeleted(newModuleId)
        })
    }

    activateModule = (curModuleId) => {
        this.setState(prevState => ({
            courseId: prevState.courseId,
            modules: prevState.modules,
            activeModule: curModuleId,
            moduleChanged: prevState.moduleChanged,
            moduleDeleted: prevState.moduleDeleted
        
    }), () =>{this.state.moduleChanged(curModuleId)}) 
    }



createModule = () => {
    let newCourse = {
        id: this.props.course.id,
        title: this.props.course.title,
        modules: [
            ...this.state.modules,
            this.state.newModule
        ]
    }
    courseService.updateCourse(this.props.course.id, newCourse)
    this.setState({
        newModule: {
            title: '',
            id: (new Date()).getTime()
        },
        modules: courseService.findCourseById(this.props.course.id).modules

    })
}

render() {

    return (

        <div className="col-md-auto mudule-lst">
      <div>
      <input
      value={this.state.newModule.title}
      onChange={this.titleChanged}
      placeholder="Module title" className="form-control"/>
      <button onClick={this.createModule} className="btn btn-primary btn-block">Create</button>
      </div>
        <div className="nav flex-column nav-pills wbdv-module-list" aria-orientation="vertical">
        {
                        this.state.modules.map(module =>
                            <ModuleListItem
                                key={module.id}
                                module={module}
                                courseId={this.state.courseId}
                                callBack={this.activateModule}
                                deleteModule={this.deleteModule}
                                activeModule={this.state.activeModule}/>
                        )
                    }
          
          
        </div>
      </div>
    );

}
}