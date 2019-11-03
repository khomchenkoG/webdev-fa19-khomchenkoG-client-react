import React from 'react'
import WidgetListComponent from "../components/WidgetListComponent";
import {connect} from 'react-redux'
import WidgetService from "../services/WidgetService";

const service = WidgetService.getInstance();

const stateToPropertyMapper = state => {
    return {
        widgets: state.widgets,
        preview: state.preview,
        topicId: state.topicId
    }
}

// sort(function(w1, w2) {
//     return w1.index - w2.index;
// })


const dispatcherToPropertyMapper = dispatch => {
    return {
        loadWidgets: () => {
            service
                .findAllWidgets()
                .then(widgets => dispatch({
                    type: "FIND_ALL_WIDGETS",
                    widgets: widgets
                }))
        },
        addWidget: () => {
            service.createWidget()
                .then(widgets => dispatch({
                    type: "CREATE_WIDGET",
                    widgets: widgets
                }))
        },
        deleteWidget: (widgetId) => {
            service.deleteWidget(this.state.topicId, widgetId)
                .then(widgets => dispatch({
                    type: "DELETE_WIDGET",
                    widgets: widgets
                }))
        },
        updateWidget: (topicId, widgetId, widget) => {
            service.updateWidget(topicId, widgetId, widget)
            .then(widgets => dispatch({
                type: "UPDATE_WIDGET",
                widgets: widgets
            }))
        },
        moveUp: (id) => {
            dispatch({type: 'MOVE_WIDGET_UP', widgetId: id})
        },
        moveDown: (id) => {
            dispatch({type: 'MOVE_WIDGET_DOWN', widgetId: id})
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


