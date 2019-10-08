import React from 'react'
import CourseRow from "./CourseRow";
import CourseCard from "./CourseCard";
import CourseService from '../services/CourseService';
import ListContainer from '../Containers/ListContainer';
import CardContainer from '../Containers/CardContainer';
import { FaPlusCircle } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaGripHorizontal } from 'react-icons/fa';
import { FaSortAlphaDown } from 'react-icons/fa';

let courseService = CourseService.getInstance();

export default class CourseList extends React.Component {
        constructor(props) {
            super(props);
            this.switchView = this.switchView.bind(this);

            this.state = {
                newCourse: {
                    id: "",
                    title: "",
                    modules: []
                },
                currentView: ListContainer,
                courses: courseService.findAllCourses()
            };
        }

        titleChanged = (event) => {
            this.setState({
                newCourse: {
                    id: (new Date()).getTime(),
                    title: event.currentTarget.value,
                    modules: []
                }
            })
        }

        createCourse = () => {
            courseService.createCourse(this.state.newCourse);
            this.setState(prevState => ({
                newCourse: {
                    id: "",
                    title: "",
                    modules: []
                },
                currentView: prevState.currentView,
                courses: courseService.findAllCourses()
            }))
        }

        deleteCourse = (id) => {
            courseService.deleteCourse(id);
            this.setState(prevState => ({
                newCourse: prevState.newCourse,
                currentView: prevState.currentView,
                courses: courseService.findAllCourses()
            }))
        }

            switchView = (view) => {
                this.setState({
                    currentView: view
                })
            }

            render() {
                return (
                    <div class ="container-fluid">
        <nav class="navbar">
            <div>
                <button class="btn wbdv-field wbdv-hamburger"><FaBars/></button>
            </div>
            <div class="navbar-brand toHide">
                <h1 class="navbar-brand wbdv-label wbdv-course-manager">Course Manager</h1>
            </div>
            <div class="col-8">
                <input value={this.state.newCourse.title}
                       onChange={this.titleChanged} 
                       type="text" 
                       className="form-control"
                       placeholder="New Course Title"/>
            </div>
            <div>
                <button onClick={this.createCourse}><FaPlusCircle/></button>
            </div>
        </nav>
        <this.state.currentView
        courses={this.state.courses}
        switchCallBack={this.switchView}
        deleteCallBack={this.deleteCourse.bind(this)}/>
    </div>

                )
            }
        }