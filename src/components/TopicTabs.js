import React from 'react'

const TopicTabs = ({topics}) =>
    <div>
        <ul className="nav nav-pills">
            {
                topics.map(topic =>
                    <li key={topic.id} className="nav-item">
                        <a className={topic.selected ? 'nav-link active' :  'nav-link topic-tab'} 
                        href="#">
                            {topic.title}
                        </a>
                    </li>
                )
            }
        </ul>
    </div>

export default TopicTabs