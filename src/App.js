import React from 'react';

import CourseList from "./components/CourseList"
import CourseEditor from "./Containers/CourseEditor"
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {createStore} from "redux";
import widgetListReducer from "./reducers/WidgetListReducer";
import Provider from "react-redux/lib/components/Provider";
import WidgetListContainer from "./Containers/WidgetListContainer";


function App() {
  return (

    <Router>
         <Switch>
             <Route exact path='/editor/:courseId'
             component={CourseEditor}/>
             <Route exact path='/' component={CourseList} />
         </Switch>
    </Router>
  );
}

export default App;
