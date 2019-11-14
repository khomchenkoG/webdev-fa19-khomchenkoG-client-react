export default class LessonService {


    static myInstance = null;
    localHost = " http://localhost:8080"
    herokuHost = "https://wbdv-f19-khomchenko-server.herokuapp.com"


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new LessonService()
            // console.log(courses);
        }
        return this.myInstance
    }

    findAllLessons(mid) {
        return fetch(this.localHost + `/api/modules/${mid}/lessons`)
            .then(response => response.json())
    }

    deleteLesson(mid, lid) {
        return fetch(this.localHost + `/api/modules/${mid}/lessons/${lid}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    }

    createLesson(mid, lesson) {
        return fetch(this.localHost + `/api/modules/${mid}/lessons`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(lesson)
        }).then(response => response.json())


    }
}