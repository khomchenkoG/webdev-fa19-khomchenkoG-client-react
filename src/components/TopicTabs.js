import React from 'react'
import '../CSS/courseEditor.css'


const TopicTabs = ({topics, callBack, activeTopic}) =>

    <div>
        <ul className="nav nav-pills">
            {

                topics.map(topic => {
                    let isActive = topic.id === activeTopic
                    return (<li key={topic.id} className= {isActive ? "active-topic" : " topic-tab"}>
                        <a className="nav-link topic-name"
                        href="#"
                        onClick = {callBack.bind(this, topic.id)}>
                            {topic.title}
                        </a>
                    </li>)
            } )
            }
        </ul>
    </div>

export default TopicTabs