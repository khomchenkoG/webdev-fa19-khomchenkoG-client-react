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

    async findWidget(topicId, widgetId){
        return fetch("http://localhost:8080/api/topics/" + topicId + "/widgets/" + widgetId)
            .then(response => response.json())
    }



    async findAllWidgets(topicId){
        return fetch("http://localhost:8080/api/topics/" + topicId + "/widgets")
            .then(response => response.json())

    }

    async createWidget(topicId){
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
        return fetch("http://localhost:8080/api/topics/" + topicId + "/widgets", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newWidget)
        })
            .then(response => response.json())
    }

    updateWidget(topicId, widgetId, widget) {
        return fetch("http://localhost:8080/api/topics/" + topicId + "/widgets/"+ widgetId, {
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

    deleteWidget(topicId, widgetId) {
        return fetch("http://localhost:8080/api/topics/" + topicId + "/widgets/"+ widgetId, {
            method: 'DELETE'})
            .then(response => response.json())
    }

}