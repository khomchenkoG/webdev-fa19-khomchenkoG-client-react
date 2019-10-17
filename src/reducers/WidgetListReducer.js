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
                widgets: state.widgets.filter(widget => widget.id !== action.widgetId),
                preview: state.preview
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
                ],
                preview: state.preview
            }

        case 'UPDATE_WIDGET':
            return {
                widgets: state.widgets.map(widget=> {
                    if (widget.id === action.widgetId) {
                        return action.widget;
                    } else {
                        return widget
                    }
        }),
                preview: state.preview
                };
        case 'FIND_ALL_WIDGETS_FOR_TOPIC':
            return {
                widgets: widgetService.findWidgets(action.topicId),
                preview: state.preview
            };
        case 'SWITCH_PREVIEW':
            return {
                widgets: state.widgets,
                preview: !state.preview
            };
        default:
            return state
    }
}

export default widgetListReducer;


