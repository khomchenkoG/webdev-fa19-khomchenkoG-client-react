import React from 'react'
import CourseService from "../services/CourseService";
import WidgetService from "../services/WidgetService";

const initialState = {
    widgets: []
}

const widgetService = WidgetService.getInstance();

const widgetListReducer = (state = initialState, action) => {

    console.log(action)

    switch (action.type) {
        case 'DELETE_WIDGET':
            return {
                widgets: state.widgets.filter(widget => widget.id !== action.widgetId)
            }
        case 'CREATE_WIDGET':
            return {
                widgets: [
                    ...state.widgets,
                    {
                        type: 'HEADING',
                        size: 2,
                        text: 'New Heading',
                        id: (new Date()).getTime()
                    }
                ]
            }

        case 'UPDATE_WIDGET':
                // for (let i = 0; i < state.widgets.length; i++) {
                //     if (state.widgets[i].id == action.widgetId) {
                //         state.widgets[i] = action.widget
                //     }
                // }
            return {
                widgets: state.widgets.map(widget=> {
                    if (widget.id === action.widgetId) {
                        return action.widget;
                    } else {
                        return widget
                    }
        })
                };
        case 'FIND_ALL_WIDGETS_FOR_TOPIC':
            return {
                widgets: widgetService.findWidgets(action.topicId)
            };
        case 'FIND_ALL_WIDGETS':
            return state;
        default:
            return state
    }
}

export default widgetListReducer;


