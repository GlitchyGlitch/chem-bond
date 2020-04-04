class IpcServer {
    /*
    Example: 
    "obj" is provided by renderer process.
    actionsObj = {
        click(obj) {
            cosnt response = obj.field1 + obj.field2
            return response 
        }
    }
    */
    constructor(actionsObj, ipcMain, once = true) {
        this.ipcMain = ipcMain
        this.once = once
        this.actionsObj = actionsObj
        if (this.once) {
            this.ipcMain.once("data-ipc-request", (event, request) => {
                this.handleRequest(event, request)
            })
        } else {
            this.ipcMain.on("data-ipc-request", (event, request) => {
                this.handleRequest(event, request)
            })
        }

    }

    handleRequest(event, request) {
        try {
            const returnedValue = this.actionsObj[request.action](request.arg)
            event.reply("data-ipc-response", returnedValue)
        } catch (e) {
            if (e.name === "TypeError") {
                console.error(`Action "${request.action}" doesn't exists!`)
            } else {
                console.error(e)
            }
        }

    }

    clearListeneres() {
        this.ipcMain.removeAllListeners()
    }
}

module.exports = { IpcServer }