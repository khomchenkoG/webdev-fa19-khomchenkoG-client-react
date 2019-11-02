import React from 'react';
import coursesJson from './Courses.json';
import CourseService from "../services/CourseService";
import '../CSS/courseEditor.css'

let courseService = CourseService.getInstance()

export default class WidgetService {


    static myInstance = null;


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new WidgetService()
            // console.log(courses);
        }
        return this.myInstance
    }


    createWidget(topicId, widget) {
    }

    async findAllWidgets(){
        return fetch("http://localhost:8080/api/widgets")
            .then(response => response.json())

    }

    async createWidget(){
        let newWidget = {
                    type: "HEADING",
                    index: 1,
                    link_title: "",
                    heading_size: 1,
                    heading_data: "",
                    list_data: "",
                    paragraph_data: "",
                    image_url: "",
                    link_data: "",
                    ordered: true,
                    id: (new Date().getTime())
                };
        return fetch("http://localhost:8080/api/widgets", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newWidget)
        })
            .then(response => response.json())
    }




        // if (this.topic.widgets) {
        //     return this.topic.widgets;
        // } else return []


    findWidget(widgetId) {
    }

    updateWidget(widgetId, widget) {
        return fetch("http://localhost:8080/api/widgets/"+ widgetId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(widget)
        })
            .then(response => response.json())



    // if (this.topic.widgets) {
        //     let widgets = this.topic.widgets
        //     for (let i = 0; i < widgets.length; i++) {
        //         if (widgets[i].id == widgetId) {
        //             widgets[i] = widget
        //         }
        // }
        // }

    }

    deleteWidget(widgetId) {
        return fetch("http://localhost:8080/api/widgets/"+ widgetId, {
            method: 'DELETE'})
            .then(response => response.json())
    }

}