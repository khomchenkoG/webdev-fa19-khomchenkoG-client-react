import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import CourseCard from "./CourseCard";
import CourseList from "./CourseList";
import CourseEditor from "../Containers/CourseEditor";
import Provider from "react-redux/lib/components/Provider";
import WidgetListContainer from "../Containers/WidgetListContainer";
import {createStore} from "redux";
import widgetListReducer from "../reducers/WidgetListReducer";
const store = createStore(widgetListReducer)

export default class WhiteBoard extends React.Component {
    render() {
        return (
                <div>
                    <Provider store={store}>
                        <WidgetListContainer/>
                    </Provider>
                </div>
        )
    }
}

