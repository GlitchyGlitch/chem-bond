class IpcClient {
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer
    }
    sendAsync(action, arg) {
        this.ipcRenderer.send("data-ipc-request", { action, arg })
        return new Promise(resolve => {
            this.ipcRenderer.on("data-ipc-response", (_, returnedValue) => {
                resolve(returnedValue)
            })
        });
    }

    sendSync(action, arg) {
        const returnedValue = this.ipcRenderer.sendSync({ action, arg })
        return returnedValue
    }

    clearListeneres() {
        this.ipcRenderer.removeAllListeners()
    }
}

module.exports = { IpcClient }