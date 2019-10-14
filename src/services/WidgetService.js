import React from 'react';
import coursesJson from './Courses.json';
import CourseService from "../services/CourseService";
import '../CSS/courseEditor.css'

let courseService = CourseService.getInstance()

export default class WidgetService {
    constructor(courseId, moduleId, lessonId) {
        this.state = {
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId,
        }
    }

    static myInstance = this;

    static widgets = null;



    static getInstance() {
        return this.myInstance
    }


    createWidget(topicId, widget) {
    }

    findWidgets(topicId) {
        let course = courseService.findCourseById(this.state.courseId)
        let module = course.modules.find(module => module.id === this.state.moduleId)
        let lesson = module.lessons.find(lesson => lesson.id === this.state.lessonId)
        let topic = lesson.topics.find(topic => topic.id === topicId)
        if (topic.widgets) {
            return topic.widgets;
        } else return []
    }

    findWidget(widgetId) {
    }

    updateWidget(widgetId, widget) {
    }

    deleteWidget(widgetId) {
    }

}