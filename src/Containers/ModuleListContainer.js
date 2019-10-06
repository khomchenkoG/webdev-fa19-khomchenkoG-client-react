import React from 'react'
import ModuleListItem from "../components/ModuleListItem";
import CourseService from "../services/CourseService";

let courseService = CourseService.getInstance()


export default class ModuleListContainer
    extends React.Component {

    constructor(props) {
        super(props)
        this.titleChanged = this.titleChanged.bind(this)
        this.createModule = this.createModule.bind(this)
        this.state = {
            newModule: {
                title: ''
            },
            modules: this.props.course.modules
                // this.courses[0]["modules"]
        }
    }

    titleChanged = (event) => {
        // this.state.newModule.title = event.currentTarget.value
        this.setState({
            newModule: {
                title: event.currentTarget.value,
                id: (new Date()).getTime()
            }
        })
    }

    createModule = () => {
        // this.setState(prevState => ({
        //         newModule: {
        //             title: ''
        //         },
        //         modules:
        //     })
        // )
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
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input
                            value={this.state.newModule.title}
                            onChange={this.titleChanged}
                            placeholder="Module title" className="form-control"/>
                        <button onClick={this.createModule} className="btn btn-primary btn-block">Create</button>
                    </li>
                    {
                        this.state.modules.map(module =>
                            <ModuleListItem
                                key={module.id}
                                module={module}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}