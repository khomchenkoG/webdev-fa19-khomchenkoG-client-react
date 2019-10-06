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

    createCourse(course) {
        this.courses.push(course)
    }

    findCourseById(courseId) {
        return this.courses.find(course => course.id === courseId)
    }

    deleteCourse(courseId) {
        this.courses = this.courses.filter(course => course.id !== courseId)
    }

    updateCourse(courseId, courseToUpdate) {
        for (let i=0; i < this.courses.length; i++){
            if(this.courses[i].id == courseId){
                this.courses[i] = courseToUpdate
            }
        }
    }

}
	
