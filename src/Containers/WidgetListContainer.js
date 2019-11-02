import React from 'react'
import WidgetListComponent from "../components/WidgetListComponent";
import {connect} from 'react-redux'
import WidgetService from "../services/WidgetService";

const service = WidgetService.getInstance();

const stateToPropertyMapper = state => {
    return {
        widgets: state.widgets,
        preview: state.preview
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
        deleteWidget: (id) => {
            service.deleteWidget(id)
                .then(widgets => dispatch({
                    type: "DELETE_WIDGET",
                    widgets: widgets
                }))
        },
        updateWidget: (id, widget) => {
            service.updateWidget(id, widget)
            .then(widgets => dispatch({
                type: "UPDATE_WIDGET",
                widgets: widgets
            }))
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


