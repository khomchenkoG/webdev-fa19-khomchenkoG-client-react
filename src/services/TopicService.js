export default class TopicService {


    static myInstance = null;
    localHost = " http://localhost:8080"
    herokuHost = "https://wbdv-f19-khomchenko-server.herokuapp.com"


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new TopicService()
            // console.log(courses);
        }
        return this.myInstance
    }

    findAllTopics(lid) {
        return fetch(this.herokuHost + `/api/lessons/${lid}/topics`)
            .then(response => response.json())
    }

    deleteTopic(lid, tid) {
        return fetch(this.herokuHost + `/api/lessons/${lid}/topics/${tid}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    }

    createTopic(lid, topic) {
        return fetch(this.herokuHost + `/api/lessons/${lid}/topics`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(topic)
        }).then(response => response.json())


    }
}