import React from 'react'
import '../CSS/courseEditor.css'
import TopicService from "../services/TopicService";
import {FaTimes} from 'react-icons/fa';


const topicService = TopicService.getInstance();

export default class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.updateInputField = this.updateInputField.bind(this);
        this.state = {
            lessonId: props.lessonId,
            topics: props.topics,
            callBack: props.callBack,
            activeTopic: props.activeTopic,
            newTopTitle: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                lessonId: nextProps.lessonId,
                topics: nextProps.topics,
                callBack: nextProps.callBack,
                activeTopic: nextProps.activeTopic,
                newTopTitle: ""
            });
    }

    async componentDidMount(){

        let topics = await topicService.findAllTopics(this.state.lessonId)

        this.setState({
            topics: topics
        })
    }

    createTopic() {
        topicService.createTopic(this.state.lessonId, this.state.newTopTitle).then(newTopics =>
            this.setState(prevState => ({
                topics: newTopics,
                newTopTitle: ""
            })))
    }

    deleteTopic(id) {
        topicService.deleteTopic(this.state.lessonId, id).then(newTopics =>
            this.setState(prevState => ({
                topics: newTopics,
                newTopTitle: ""
            })))
    }


    updateInputField(event) {
        this.setState({
            newTopTitle: event.currentTarget.value,
        })
    }

    render() {

        if (this.state.lessonId){
            return (
                <div>
                    <ul className="nav nav-pills">
                        {


                            this.state.topics.map(topic => {
                                let isActive = topic.id === this.state.activeTopic
                                return (<li key={topic.id} className= {isActive ? "active-topic" : " topic-tab"}>
                                    <div className="form-inline">
                                        <a className="nav-link topic-name"
                                           href="#"
                                           onClick = {this.state.callBack.bind(this, topic.id)}
                                        >
                                            {topic.title}
                                        </a>
                                        <button
                                            onClick={() => this.deleteTopic(topic.id)}
                                            className="btn"
                                            style={{float: 'right'}}>
                                            <FaTimes class="delete-btn"/></button>
                                    </div>
                                </li>)
                            } )
                        }
                        <form className="form-inline create-lesson">
                            <div className="form-group mx-sm-1 mb-2">
                                <input onChange={this.updateInputField}
                                       value={this.state.newTopTitle}
                                       className="form-control  take-full-height" placeholder="New Topic"/>
                            </div>
                            <button onClick={this.createTopic} type="submit" className="btn btn-primary mb-2">Create</button>
                        </form>
                    </ul>
                </div>

            )
        } else {
            return null
        }

    }
}
