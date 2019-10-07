import React from 'react'
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicTabs from "../components/TopicTabs";
import CourseService from '../services/CourseService';
import ModuleListContainer from '../Containers/ModuleListContainer';
import '../CSS/courseEditor.css'

let courseService = CourseService.getInstance();

export default class CourseEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.moduleChanged = this.moduleChanged.bind(this)
        this.lessonChanged = this.lessonChanged.bind(this)
        this.moduleDeleted = this.moduleDeleted.bind(this)
        this.state = {
            course: courseService.findCourseById(props.match.params.courseId),
            moduleId: null,
            lessonId: null
        }
    }

    findLessons(moduleId){
    let lessonsToRender
        if (this.state.moduleId) {
            lessonsToRender = courseService
            .findLessons(this.state.course.id, this.state.moduleId)
        } else if (this.state.course.modules[0]) {
            lessonsToRender = this.state.course.modules[0].lessons
        
        }
        if (!lessonsToRender){
            lessonsToRender = []
        }
    return lessonsToRender;
    }

    moduleDeleted(curModuleId){
        this.setState(prevState =>({
            course: prevState.course,
            moduleId: curModuleId,
            lessonId: null
        }))

    }

    findTopics(lessonId, lessons){
    let topicsToRender;
    if (this.state.lessonId){
        topicsToRender = courseService
            .findTopics(this.state.lessonId, lessons)
    } else if (lessons[0].topics){
        topicsToRender = lessons[0].topics

    }
    if (!topicsToRender){
        topicsToRender = []
    }
    return topicsToRender;
    }


    moduleChanged = (curModuleId) => {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: curModuleId,
            lessonId: prevState.lessonId
        }))
        
    }

    lessonChanged = (curLeesonId) => {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: prevState.cmoduleId,
            lessonId: curLeesonId
        }))
    }



    render() {
        let lessonsToRender = this.findLessons(this.state.moduleId)
        let topicsToRender
        if (lessonsToRender.length != []){
            topicsToRender = this.findTopics(this.state.lessonId, lessonsToRender)
        } else {
            topicsToRender = []
        }
        
        

        return (
            <div class="container-fluid">
        <nav className="navbar navbar-collapse navbar-expand-lg editor-nav">
        <div className="nav nav-tabs editor-nav-tabs nav-justified take-full-width">
          <button className="btn"><i className="fas fa-times" /></button>
          <b className="navbar-brand wbdv-course-title">Course Editor {this.state.course.id}</b>
          <a className="nav-link editor-tab toHide" href="#">Build</a>
          <a className="nav-link editor-tab">Pages</a>
          <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Theme</a>
          <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Store</a>
          <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Apps</a>
          <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Settings</a>
          <button className="btn wbdv-new-page-btn alignRight" style={{float: 'right'}}><i className="fas fa-plus-circle fa-2x" /></button>
        </div>
      </nav>
        <div className="row">
            <div className="col-4">
                <ModuleListContainer 
                course={this.state.course}
                moduleChanged={this.moduleChanged}
                moduleDeleted={this.moduleDeleted}/>
            </div>
            <div className="col-8 take-full-width">
            <LessonTabs 
            lessons={lessonsToRender}
            callBack={this.lessonChanged}
            />
            <TopicTabs 
            topics={topicsToRender}
            />
            </div>


        </div>
    </div>)
    }
}