 class StringBuilder extends String {
    constructor() {
        super()
        this.buffer = [];
    }

    append(str) {
        this.buffer.push(str)
    }

    getString() {
        return this.buffer.join("")
    }

    spacer() {
        this.buffer.push(" ")
    }


}

module.exports.StringBuilder = StringBuilder