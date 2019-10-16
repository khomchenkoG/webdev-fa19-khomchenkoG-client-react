import React from 'react';
import coursesJson from './Courses.json';
import CourseService from "../services/CourseService";
import '../CSS/courseEditor.css'

let courseService = CourseService.getInstance()

export default class WidgetService {
    constructor(courseId, moduleId, lessonId, topicId) {
        this.course = courseService.findCourseById(courseId)
        this.topic = courseService.findCourseById(courseId)
            .modules.find(module => module.id === moduleId)
            .lessons.find(lesson => lesson.id === lessonId)
            .topics.find(topic => topic.id === topicId)
    }


    static myInstance = this;


    static getInstance() {
        return this.myInstance
    }


    createWidget(topicId, widget) {
    }

    findWidgets() {
        if (this.topic.widgets) {
            return this.topic.widgets;
        } else return []
    }

    findWidget(widgetId) {
    }

    updateWidget(widgetId, widget) {
        if (this.topic.widgets) {
            let widgets = this.topic.widgets
            for (let i = 0; i < widgets.length; i++) {
                if (widgets[i].id == widgetId) {
                    widgets[i] = widget
                }
        }
        }

    }

    deleteWidget(widgetId) {
        let widgets = this.topic.widgets.filter(widget => widget.id !== widgetId)
        return widgets
    }

}