const postingSrv = require("../service/posting.service")

class Posting {
    constructor() {}

    writeNewPosting = async(content) => {
        try {
            const response = await postingSrv.writeNewPosting(content);
            if(response instanceof Error) return response;
            return response;
        } catch (error) {
            debugger            
        }
    }

    getPostingList = async(query) => {
        try {
            const {data, error} = await postingSrv.getPostingsList(query);
            if(error) return {error};
            return {data};
        } catch (error) {
            return {error}
        }
    }
    

}

module.exports = Posting