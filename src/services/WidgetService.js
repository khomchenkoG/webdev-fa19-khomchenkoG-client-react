import React from 'react';
import coursesJson from './Courses.json';
import CourseService from "../services/CourseService";
import '../CSS/courseEditor.css'

let courseService = CourseService.getInstance()

export default class WidgetService {

    localHost = " http://localhost:8080"
    herokuHost = "https://wbdv-f19-khomchenko-server.herokuapp.com"

    static myInstance = null;


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new WidgetService()
            // console.log(courses);
        }
        return this.myInstance
    }

    async findWidget(topicId, widgetId){
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets/" + widgetId)
            .then(response => response.json())
    }



    async findAllWidgets(topicId){
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets")
            .then(response => response.json())

    }

    async

    async createWidget(topicId){
        let newWidget = {
                    type: "HEADING",
                    idx: 1,
                    link_title: "",
                    heading_size: 1,
                    heading_data: "",
                    list_data: "",
                    paragraph_data: "",
                    image_url: "",
                    link_data: "",
                    ordered: true,
                };
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newWidget)
        })
            .then(response => response.json())
    }

    updateWidget(topicId, widgetId, widget) {
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets/"+ widgetId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(widget)
        })
            .then(response => response.json())
    }

    saveAllWidgets(topicId, widgets) {
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(widgets)
        })
            .then(response => response.json())
    }

    deleteWidget(topicId, widgetId) {
        return fetch(this.localHost + "/api/topics/" + topicId + "/widgets/"+ widgetId, {
            method: 'DELETE'})
            .then(response => response.json())
    }

}