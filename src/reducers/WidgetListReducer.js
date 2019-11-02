import React from 'react'
import CourseService from "../services/CourseService";
import WidgetService from "../services/WidgetService";
import 'array.prototype.move';

const initialState = {
    widgets: []
}

const widgetService = WidgetService.getInstance();




const widgetListReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);

    function swapWidgets (widgets, idx1, idx2){
        let swappedArray = widgets.slice();

        swappedArray[idx1] = widgets[idx2]
        swappedArray[idx2] = widgets[idx1]

        return swappedArray;

    }




    switch (action.type) {
        case "FIND_ALL_WIDGETS":
            return {
                widgets: action.widgets,
                preview: state.preview
            }
        case 'DELETE_WIDGET':
            return {
                widgets: action.widgets,
                preview: state.preview
            }
        case 'CREATE_WIDGET':
            return {
                // widgets: [
                //     ...state.widgets,
                //     {
                //         type: "HEADING",
                //         index: 1,
                //         link_title: "",
                //         heading_size: 1,
                //         heading_data: "",
                //         list_data: "",
                //         paragraph_data: "",
                //         image_url: "",
                //         link_data: "",
                //         ordered: true,
                //         id: (new Date().getTime())
                //     }
                // ],
                widgets: action.widgets,
                preview: state.preview
            }

        case 'UPDATE_WIDGET':

            return {
                widgets: action.widgets,
                preview: state.preview
            }
        //         widgets: state.widgets.map(widget=> {
        //             if (widget.id === action.widgetId) {
        //                 return action.widget;
        //             } else {
        //                 return widget
        //             }
        // }),
        //         preview: state.preview
        //         };

        case 'MOVE_WIDGET_UP':
            let idxUp = state.widgets.indexOf(state.widgets.find(widget => widget.id === action.widgetId))
            return {
                widgets: swapWidgets(state.widgets, idxUp, idxUp - 1),
                preview: false
            };
        case 'MOVE_WIDGET_DOWN':
            let idxDown = state.widgets.indexOf(state.widgets.find(widget => widget.id === action.widgetId))

            return {
                widgets: swapWidgets(state.widgets, idxDown, idxDown + 1),
                preview: false
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


