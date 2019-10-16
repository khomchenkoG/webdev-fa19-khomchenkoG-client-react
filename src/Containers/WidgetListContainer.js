import React from 'react'
import WidgetListComponent from "../components/WidgetListComponent";
import {connect} from 'react-redux'
import CourseEditor from "./CourseEditor";

const stateToPropertyMapper = state => {
    return {
        widgets: state.widgets
    }
}

const dispatcherToPropertyMapper = dispatch => {
    return {
        addWidget: () => {
            dispatch({type: 'CREATE_WIDGET'})
        },
        deleteWidget: (id) => {
            dispatch({type: 'DELETE_WIDGET', widgetId: id})
        },
        updateWidget: (id, widget) => {
            dispatch({type: 'UPDATE_WIDGET', widgetId: id, widget: widget})
        },
        findAllWidgetsForTopic: (id) => {
            dispatch({
                type: 'FIND_ALL_WIDGETS_FOR_TOPIC', topicId: id
            })
        },
        findAllWidgets: () => {
            dispatch({
                type: 'FIND_ALL_WIDGETS'
            })
        }
    }
}

const WidgetListContainer =
    connect(stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetListComponent)

export default WidgetListContainer;





// import React from 'react'
//
// import WidgetListComponent from "../components/WidgetListComponent";
// import {connect} from 'react-redux'
//
// const stateToPropertyMapper = state => {
//     return {
//         widgets: state.widgets
//     }
// }
//

//
// const WidgetListContainer =
//     connect(stateToPropertyMapper,
//         dispatcherToPropertyMapper)
//     (WidgetListComponent)
//
// export default WidgetListContainer;

//  const createWidget = () => {
//     return {
//         type: 'CREATE_WIDGET'
//     }
// }
//
//  const deleteWidget = () => {
//     return {
//         type: 'DELETE_WIDGET'
//     }
// }
//
//  const updateWidget = (id) => {
//     return {
//         type: 'UPDATE_WIDGET'
//     }
// }
//
//  const findAllWidgetsForTopic = () => {
//     return {
//         type: 'FIND_ALL_WIDGETS_FOR_TOPIC'
//     }
// }
//
//  const findAllWidgets = () => {
//     return {
//         type: 'FIND_ALL_WIDGETS'
//     }
// }