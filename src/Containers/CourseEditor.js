import React from 'react'
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicTabs from "../components/TopicTabs";
import CourseService from '../services/CourseService';
import ModuleListContainer from '../Containers/ModuleListContainer';
import WidgetListContainer from '../Containers/WidgetListContainer';
import '../CSS/courseEditor.css'
import Provider from "react-redux/lib/components/Provider";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import widgetListReducer from "../reducers/WidgetListReducer";
import WidgetService from "../services/WidgetService";

let courseService = CourseService.getInstance();


const EditorContext = React.createContext(null)


export default class CourseEditor
extends React.Component {


    constructor(props) {
        super(props)
        this.moduleChanged = this.moduleChanged.bind(this)
        this.lessonChanged = this.lessonChanged.bind(this)
        this.topicChanged = this.topicChanged.bind(this)
        this.moduleDeleted = this.moduleDeleted.bind(this)
        this.findFirstModule = this.findFirstModule.bind(this)

        this.state = {
            course: courseService.findCourseById(props.match.params.courseId),
            moduleId: this.findFirstModule(courseService.findCourseById(props.match.params.courseId)),
            lessonId: this.findFirstLesson(courseService.findCourseById(props.match.params.courseId), null),
            topicId: null,
            widgetService: null

            
        }
    }



    findFirstModule(course) {
        let firstModule = null;
        if (course.modules) {
            let modules = course.modules;
            if (modules[0]) {
                if (modules[0].id) {
                    firstModule = modules[0].id
                }
            }
        }
        return firstModule;

    }

    findFirstLesson(course, curModule) {
        if (!curModule) {
            curModule = this.findFirstModule(course);
        }
        let lessons = null;
        let firstLesson = null;

        if (curModule) {
            lessons = courseService.findLessons(course.id, curModule)
            if (lessons.length != 0) {
                firstLesson = lessons[0].id
             }
        }
        return firstLesson;

    }



    findLessons(moduleId) {
        let lessonsToRender
        if (this.state.moduleId) {
            lessonsToRender = courseService
                .findLessons(this.state.course.id, this.state.moduleId)
        } else if (this.state.course.modules[0]) {
            lessonsToRender = this.state.course.modules[0].lessons

        }
        if (!lessonsToRender) {
            lessonsToRender = []
        }
        return lessonsToRender;
    }

    moduleDeleted(curModuleId) {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: curModuleId,
            lessonId: null,
            topicId: prevState.topicId,
            widgetService: prevState.widgetService
        }))

    }

    findTopics(lessonId, lessons) {
        let topicsToRender;
        if (this.state.lessonId) {
            topicsToRender = courseService
                .findTopics(this.state.lessonId, lessons)
        } else if (lessons[0].topics) {
            topicsToRender = lessons[0].topics

        }
        if (!topicsToRender) {
            topicsToRender = []
        }
        return topicsToRender;
    }


    moduleChanged = (curModuleId) => {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: curModuleId,
            lessonId: this.findFirstLesson(prevState.course, curModuleId),
            topicId: null,
            widgetService: prevState.widgetService

        }))

    }

    lessonChanged = (curLeesonId) => {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: prevState.moduleId,
            lessonId: curLeesonId,
            topicId: null,
            widgetService: prevState.widgetService
        }))
    }

    topicChanged = (curTopicId) => {
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: prevState.moduleId,
            lessonId: prevState.lessonId,
            topicId: curTopicId,
            widgetService: new WidgetService(this.state.course.id, prevState.moduleId,
                prevState.lessonId, curTopicId)
        }))

    }

    setUpView() {

        let lessonsToRender = this.findLessons(this.state.moduleId)
        let topicsToRender
        if (lessonsToRender.length != 0) {
            topicsToRender = this.findTopics(this.state.lessonId, lessonsToRender)
        } else {
            topicsToRender = []
        }
        return { lessons: lessonsToRender, topics: topicsToRender }


    }



    render() {
        let args = this.setUpView();
        let store = createStore(widgetListReducer);
        if (this.state.topicId != null){
            store = createStore(widgetListReducer,
                {widgets: this.state.widgetService.findWidgets()},
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
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
                moduleDeleted={this.moduleDeleted}
                activeModule={this.state.moduleId}/>
            </div>
            <div className="col-8 take-full-width">
            <LessonTabs 
            lessons={args.lessons}
            callBack={this.lessonChanged}
            activeLesson={this.state.lessonId}
            />
            <TopicTabs 
            topics={args.topics}
            callBack={this.topicChanged}
            activeTopic={this.state.topicId}
            />
            <Provider store={store} context= {EditorContext}>
                <WidgetListContainer context= {EditorContext}/>
            </Provider>

            </div>


        </div>
    </div>)
    }
}