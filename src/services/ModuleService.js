export default class ModuleService {


    static myInstance = null;
    localHost = " http://localhost:8080"
    herokuHost = "https://wbdv-f19-khomchenko-server.herokuapp.com"


    static getInstance() {

        if (this.myInstance == null) {
            this.myInstance = new ModuleService()
            // console.log(courses);
        }
        return this.myInstance
    }

    findAllModules(cid) {
        return fetch(this.localHost + `/api/courses/${cid}/modules`)
            .then(response => response.json())
    }

    deleteModule(cid, mid) {
        return fetch(this.localHost + `/api/courses/${cid}/modules/${mid}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    }

    createModule(cid, module) {
        return fetch(this.localHost + `/api/courses/${cid}/modules`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(module)
        }).then(response => response.json())


    }
}