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
        loadWidgets: (topicId) => {
            service
                .findAllWidgets(topicId)
                .then(widgets => dispatch({
                    type: "FIND_ALL_WIDGETS",
                    widgets: widgets
                }))
        },
        addWidget: (topicId) => {
            service.createWidget(topicId)
                .then(widgets => dispatch({
                    type: "CREATE_WIDGET",
                    widgets: widgets
                }))
        },
        deleteWidget: (topicId, widgetId) => {
            service.deleteWidget(topicId, widgetId)
                .then(widgets => dispatch({
                    type: "DELETE_WIDGET",
                    widgets: widgets
                }))
        },
        updateWidget: (topicId, widgetId, widget) => {
            dispatch({type: 'UPDATE_WIDGET', widget: widget})

            // service.updateWidget(topicId, widgetId, widget)
            // .then(widgets => dispatch({
            //     type: "UPDATE_WIDGET",
            //     widgets: widgets
            // }))
        },
        moveUp: (topicId, widgetId) => {
            dispatch({type: 'MOVE_WIDGET_UP', widgetId: widgetId})
            // service.findWidget(topicId, widgetId)
            //     .then(widget => {
            //         const newWidget = widget;
            //         newWidget.index = newWidget.index - 1
            //         return newWidget
            //     })
            //     .then(newWidget => service.updateWidget(topicId, widgetId, newWidget)
            //         .then(widgets => dispatch({
            //             type: "UPDATE_WIDGET",
            //             widgets: widgets.sort(function(w1, w2) {
            //                 return w1.index - w2.index;
            //             })
            //         })))
        },
        moveDown: (topicId, widgetId) => {
            dispatch({type: 'MOVE_WIDGET_DOWN', widgetId: widgetId})

            // service.findWidget(topicId, widgetId)
            //     .then(widget => {
            //         const newWidget = widget;
            //         newWidget.index = newWidget.index + 1
            //         return newWidget
            //     })
            //     .then(newWidget => service.updateWidget(topicId, widgetId, newWidget)
            //     .then(widgets => dispatch({
            //         type: "UPDATE_WIDGET",
            //         widgets: widgets.sort(function(w1, w2) {
            //             return w1.index - w2.index;
            //         })
            //     })))


        },
        switchPreview:()  => {
            dispatch({
                type: 'SWITCH_PREVIEW'
            })
        },

        saveAllWidgets: (topicId, widgets) => {
            service.saveAllWidgets(topicId, widgets)
                .then(widgets => dispatch({
                    type: "SAVE_ALL_WIDGETS",
                    widgets: widgets
                }))
        }
    }
}

const WidgetListContainer =
    connect(stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetListComponent)

export default WidgetListContainer;


