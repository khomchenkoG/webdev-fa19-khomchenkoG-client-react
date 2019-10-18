import React from 'react'
import WidgetListComponent from "../components/WidgetListComponent";
import {connect} from 'react-redux'
import CourseEditor from "./CourseEditor";

const stateToPropertyMapper = state => {
    return {
        widgets: state.widgets,
        preview: state.preview
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
        moveUp: (id) => {
            dispatch({type: 'MOVE_WIDGET_UP', widgetId: id})
        },
        moveDown: (id) => {
            dispatch({type: 'MOVE_WIDGET_DOWN', widgetId: id})
        },
        findAllWidgets: () => {
            dispatch({
                type: 'FIND_ALL_WIDGETS'
            })
            },
        switchPreview:()  => {
            dispatch({
                type: 'SWITCH_PREVIEW'
            })
        }
    }
}

const WidgetListContainer =
    connect(stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetListComponent)

export default WidgetListContainer;


