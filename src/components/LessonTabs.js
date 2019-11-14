import React from 'react'
import '../CSS/courseEditor.css'
import LessonService from "../services/LessonService";
import {FaTimes} from 'react-icons/fa';
import TopicTabs from "./TopicTabs";
import TopicService from "../services/TopicService";

const lessonService = LessonService.getInstance();
const topicService = TopicService.getInstance();

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.updateInputField = this.updateInputField.bind(this);
        this.state = {
            moduleId: props.moduleId,
            lessons: props.lessons,
            callBack: props.callBack,
            activeLesson: props.activeLesson,
            newLesTitle: "",
            updateCourse: props.updateCourse,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            moduleId: nextProps.moduleId,
            lessons: nextProps.lessons,
            callBack: nextProps.callBack,
            activeLesson: nextProps.activeLesson,
            newLesTitle: "",
            updateCourse: nextProps.updateCourse,

        });
    }

    // changeLesson(id){
    //     topicService.findAllTopics(id).then(topics =>
    //         this.setState({
    //             topics: topics,
    //             activeLesson:id
    //         })).then(this.state.callBack(id))
    //
    // }

    // componentDidMount() {
    //     let topics = topicService.findAllTopics(this.state.activeLesson).then(topics =>
    //     this.setState({
    //         topics: topics,
    //     }))
    // }

    createLesson() {
        lessonService.createLesson(this.state.moduleId, this.state.newLesTitle).then(newLessons =>
            this.setState(prevState => ({
                lessons: newLessons,
                callBack: prevState.callBack,
                activeLesson: prevState.activeLesson,
                newLesTitle: ""
            }))).then(this.state.updateCourse)
    }

    deleteLesson(id) {
        lessonService.deleteLesson(this.state.moduleId, id).then(newLessons =>
            this.setState(prevState => ({
                lessons: newLessons,
                callBack: prevState.callBack,
                activeLesson: prevState.activeLesson,
                newLesTitle: ""
            })))
    }


    updateInputField(event) {
        this.setState({
            newLesTitle: event.currentTarget.value,
        })
    }


    render() {

        return (<div>
            <ul className="nav nav-pills ">
                {


                    this.state.lessons.map(lesson => {
                            let isActive = lesson.id === this.state.activeLesson;
                            return (<li key={lesson.id}
                                        className={isActive ? "nav-item active-lesson" : "nav-item lesson-tab"}>
                                <div class="form-inline">
                                    <a className='nav-link'
                                       href="#"
                                       onClick={() => this.state.callBack(lesson.id)}>
                                        {lesson.title}
                                    </a>
                                    <button
                                        onClick={() => this.deleteLesson(lesson.id)}
                                        className="btn"
                                        style={{float: 'right'}}>
                                        <FaTimes class="delete-btn"/></button>
                                </div>

                            </li>)

                        }
                    )
                }
                <form className="form-inline create-lesson">
                    <div className="form-group mx-sm-1 mb-2">
                        <input onChange={this.updateInputField}
                               value={this.state.newLesTitle}
                               className="form-control take-full-width take-full-height" placeholder="New Lesson"/>
                    </div>
                    <button onClick={this.createLesson} type="submit" className="btn btn-primary mb-2">Create</button>
                </form>
            </ul>
            {/*<TopicTabs*/}
            {/*    lessonId={this.state.activeLesson}*/}
            {/*    topics={this.state.topics}*/}
            {/*    callBack={null}*/}
            {/*    activeTopic={null}*/}
            {/*/>*/}
        </div>)
    }

}