import coursesJson from './Courses.json';



export default class CourseService {

    static myInstance = null;
    courses = coursesJson;

    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new CourseService()
            // console.log(courses);
        }
        return this.myInstance
    }

    findAllCourses() {
        return fetch("https://wbdv-f19-khomchenko-server.herokuapp.com/api/courses")
            .then(response => response.json())
    }

    findInitialItems(course){
        let initItems = {
            "firstModule": null,
            "firstLesson": null,
            "firstTopic": null,
        }
            if (course.modules[0]){
                let firstMod = course.modules[0]
                initItems.firstModule = firstMod.id;
                if (firstMod.lessons){
                    if (firstMod.lessons[0]){
                        let firstLes = firstMod.lessons[0];
                        initItems.firstLesson = firstLes.id;
                        if (firstLes.topics){
                            if (firstLes.topics[0]){
                                let firstTop = firstLes.topics[0]
                                initItems.firstTopic = firstTop.id;
                            }

                        }
                    }
                }
            }
            return initItems;
        }



    findWidgets(courseId, moduleId, lessonId, topicId){
        if(courseId && moduleId && lessonId && topicId){
            let course = this.findCourseById(courseId);
            let module
        }

    }

    findLessons(course, moduleId) {
        let modules = course.modules
        let module = modules.find(module => module.id === moduleId)
        let lessons;
        if (module){
            if (module.lessons){
               lessons = module.lessons   
            } 
        }
        if (lessons) {
            return lessons;
        } else {
            return [];
        }
    }

    findTopics(lessonId, lessons) {
        let lesson = lessons.find(lesson => lesson.id === lessonId)
        if (lesson.topics){
            return lesson.topics
        } else {
            return []
        }
    }

    createCourse(course) {
        return fetch("https://wbdv-f19-khomchenko-server.herokuapp.com/api/courses", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(course)
        }).then(response => response.json())

    }

    findCourseById(courseId) {
        return fetch(`https://wbdv-f19-khomchenko-server.herokuapp.com/api/courses/${courseId}`)
            .then(response => response.json())
    }

    deleteModule(moduleId, courseId){
        let course = this.findCourseById(courseId);
        course.modules = course.modules.filter(module => module.id !== moduleId)
        this.updateCourse(courseId, course)
    }

    deleteCourse(courseId) {
        return fetch(`https://wbdv-f19-khomchenko-server.herokuapp.com/api/courses/${courseId}`, {
            method: 'DELETE'})
            .then(response => response.json())
    }

    updateCourse(courseId, courseToUpdate) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].id == courseId) {
                this.courses[i] = courseToUpdate
            }
        }
    }

}