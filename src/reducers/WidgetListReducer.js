import React from 'react'
import CourseService from "../services/CourseService";
import WidgetService from "../services/WidgetService";
import 'array.prototype.move';


const widgetService = WidgetService.getInstance();




const widgetListReducer = (state, action) => {
    let newState = Object.assign({}, state);

    function swapWidgets (widgets, idx1, idx2){
        let swappedArray = widgets.slice();

        let indexOf1 = swappedArray[idx1].idx

        swappedArray[idx1].idx = swappedArray[idx2].idx
        swappedArray[idx2].idx = indexOf1

        swappedArray[idx1] = widgets[idx2]
        swappedArray[idx2] = widgets[idx1]

        return swappedArray;

    }




    switch (action.type) {
        case "FIND_ALL_WIDGETS":
            return {
                widgets: action.widgets,
                preview: state.preview,
                topicId: state.topicId
            }
        case 'DELETE_WIDGET':
            return {
                widgets: action.widgets,
                preview: state.preview,
                topicId: state.topicId
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
                preview: state.preview,
                topicId: state.topicId
            }

        case 'UPDATE_WIDGET':
            let updatedWidgets = state.widgets.slice()
            updatedWidgets[action.widget.idx - 1] = action.widget

            return {
                widgets: updatedWidgets,
                preview: state.preview,
                topicId: state.topicId
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

        // case 'MOVE_WIDGET_UP':
        //     let idxUp = state.widgets.indexOf(state.widgets.find(widget => widget.id === action.widgetId))
        //     return {
        //         widgets: swapWidgets(state.widgets, idxUp, idxUp - 1),
        //         preview: false,
        //         topicId: state.topicId
        //     };
        // case 'MOVE_WIDGET_DOWN':
        //     let idxDown = state.widgets.indexOf(state.widgets.find(widget => widget.id === action.widgetId))
        //
        //     return {
        //         widgets: swapWidgets(state.widgets, idxDown, idxDown + 1),
        //         preview: false,
        //         topicId: state.topicId
        //     };
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
        case 'SWITCH_PREVIEW':
            return {
                widgets: state.widgets,
                preview: !state.preview,
                topicId: state.topicId
            };
        default:
            return state
    }


}

export default widgetListReducer;


