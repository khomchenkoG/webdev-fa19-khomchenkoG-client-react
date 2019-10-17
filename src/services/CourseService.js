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
        return this.courses
    }

    findInitialItems(courseId){
        let initItems = {
            "firstModule": null,
            "firstLesson": null,
            "firstTopic": null,
        }
        let course = this.findCourseById(courseId)
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

    findLessons(courseId, moduleId) {
        let course = this.courses.find(course => course.id === courseId)
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
        this.courses.push(course)
    }

    findCourseById(courseId) {
        return this.courses.find(course => course.id === courseId)
    }

    deleteModule(moduleId, courseId){
        let course = this.findCourseById(courseId);
        course.modules = course.modules.filter(module => module.id !== moduleId)
        this.updateCourse(courseId, course)
    }

    deleteCourse(courseId) {
        this.courses = this.courses.filter(course => course.id !== courseId)
    }

    updateCourse(courseId, courseToUpdate) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].id == courseId) {
                this.courses[i] = courseToUpdate
            }
        }
    }

}