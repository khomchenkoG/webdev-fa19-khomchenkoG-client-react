import React from 'react';
import logo from './logo.svg';
import WhiteBoard from "./components/WhiteBoard"
import CourseList from "./components/CourseList"
import CourseEditor from "./Containers/CourseEditor"
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
         <Switch>
             <Route exact path='/editor/:courseId' component={CourseEditor}/>
             <Route exact path='/' component={CourseList} />
         </Switch>
    </Router>
  );
}

export default App;
