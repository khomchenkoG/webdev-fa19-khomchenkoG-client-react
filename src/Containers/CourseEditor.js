import React from 'react'
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicTabs from "../components/TopicTabs";
import CourseService from '../services/CourseService';
import ModuleService from '../services/ModuleService';
import ModuleListContainer from '../Containers/ModuleListContainer';
import WidgetListContainer from '../Containers/WidgetListContainer';
import '../CSS/courseEditor.css'
import Provider from "react-redux/lib/components/Provider";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import widgetListReducer from "../reducers/WidgetListReducer";
import WidgetService from "../services/WidgetService";
import WidgetListComponent from "../components/WidgetListComponent";
import dispatcherToPropertyMapper from '../Containers/WidgetListContainer'
import LessonService from "../services/LessonService";

let courseService = CourseService.getInstance();
let moduleService = ModuleService.getInstance();
let lessonService = LessonService.getInstance();
let widgetService = WidgetService.getInstance();


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
        this.updateCourse = this.updateCourse.bind(this)

        this.state = {
            courseId: props.match.params.courseId,
            course: null,
            moduleId: null,
            lessonId: null,
            topicId: null,
            widgets: null
        }
    }

    async componentDidMount() {
        console.log("I was called")
        let course = await courseService.findCourseById(this.state.courseId)
        let initItems = await courseService.findInitialItems(course)
        this.setState(prevState =>({
                course: course,
                moduleId: prevState.moduleId ? prevState.moduleId : initItems.firstModule,
                lessonId: initItems.firstLesson,
                topicId: initItems.firstTopic,
                widgets: null
            })
        )
    }

    updateCourse () {
        courseService.findCourseById(this.state.courseId).then(updatedCourse =>
            this.setState({
                course: updatedCourse
            }))
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
            lessons = courseService.findLessons(course, curModule)
            if (lessons.length != 0) {
                firstLesson = lessons[0].id
            }
        }
        return firstLesson;

    }

    async findFirstTopic(curModule, curLesson) {
        let modules = await moduleService.findAllModules(this.state.courseId)
        let module = modules.find(module => module.id === curModule);
        if (module.lessons.length > 0){
            let lesson = module.lessons.find(les => les.id === curLesson);
            let topicId = null;
            if (lesson.topics && lesson.topics.length > 0) {
                topicId = lesson.topics[0].id
            }
            return topicId;
        } else {
            return null;
        }

    }


    findLessons(moduleId) {
        let lessonsToRender
        if (this.state.moduleId) {
            lessonsToRender = courseService
                .findLessons(this.state.course, moduleId)
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
            topicId: this.findFirstTopic(curModuleId, this.findFirstLesson(prevState.course, curModuleId))
        }))

    }

    async lessonChanged (curLessonId) {
        await this.updateCourse()
        this.findFirstTopic(this.state.moduleId, curLessonId).then(topicId =>
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: prevState.moduleId,
            lessonId: curLessonId,
            topicId: topicId
        })))
    }

    async topicChanged (curTopicId) {
        await this.updateCourse()
        this.setState(prevState => ({
            course: prevState.course,
            moduleId: prevState.moduleId,
            lessonId: prevState.lessonId,
            topicId: curTopicId,
            widgetService: prevState.widgetService
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
        return {lessons: lessonsToRender, topics: topicsToRender}


    }


    render() {
        if (this.state.course) {
            let args = this.setUpView();
            console.log("Topics size: " + args.topics.length)
            console.log("TopcId: " + this.state.topicId)
            //let store = createStore(widgetListReducer);
            let store = createStore(widgetListReducer,
                {
                    widgets: [],
                    preview: false,
                    topicId: this.state.topicId
                },
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
            widgetService
                .findAllWidgets(this.state.topicId)
                .then(widgets => store.dispatch({
                    type: "FIND_ALL_WIDGETS",
                    widgets: widgets
                }))

            // if (this.state.widgets != null){
            //     let topicsWidgets = widgetService.findWidgets();
            //         ////args.topics.find(topic => topic.id === this.state.topicId).widgets;
            //     let widgets = this.state.widgets;
            //     // if (topicsWidgets.length > 0){
            //     //     widgets = topicsWidgets;
            //     // }
            //     store = createStore(widgetListReducer,
            //         {widgets: [],
            //         preview: false},
            //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
            // }

            return (
                <div class="container-fluid">
                    <nav className="navbar navbar-collapse navbar-expand-lg editor-nav">
                        <div className="nav nav-tabs editor-nav-tabs nav-justified take-full-width">
                            <button className="btn"><i className="fas fa-times"/></button>
                            <b className="navbar-brand wbdv-course-title">Course Editor {this.state.course.id}</b>
                            <a className="nav-link editor-tab toHide" href="#">Build</a>
                            <a className="nav-link editor-tab">Pages</a>
                            <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Theme</a>
                            <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Store</a>
                            <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Apps</a>
                            <a className="nav-link editor-tab wbdv-page-tab toHide" href="#">Settings</a>
                            <button className="btn wbdv-new-page-btn alignRight" style={{float: 'right'}}><i
                                className="fas fa-plus-circle fa-2x"/></button>
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
                                moduleId={this.state.moduleId}
                                lessons={args.lessons}
                                callBack={this.lessonChanged}
                                activeLesson={this.state.lessonId}
                                updateCourse={this.updateCourse}
                            />
                            <TopicTabs
                                lessonId={this.state.lessonId}
                                topics={args.topics}
                                callBack={this.topicChanged}
                                activeTopic={this.state.topicId}
                            />
                            <Provider store={store} context={EditorContext}>
                                <WidgetListContainer context={EditorContext}/>
                            </Provider>

                        </div>


                    </div>
                </div>)

        } else {
            return (null)
        }

    }
}