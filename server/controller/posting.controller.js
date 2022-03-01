const validator = require("../common/validator");
const Posting = require("../model/posting.model")
const posting = new Posting();

exports.getPostings = async(req, res) => {
    try {
        const query = req.query;
        const {data, error} = await posting.getPostingList(query);
        if (error || error instanceof Error) return res.send({success:false, message: error.message});
        return res.send({success:true, value: data})
    } catch (error) {
        debugger
        return res.send({success:false, message: error.message})
    }
}




exports.newPosting = async(req, res) => {
    try {
        const { error } = await validator.postingValidator(req.body);
        if (error || error instanceof Error) return res.send({success: false, message: error.message});
        const result = await posting.writeNewPosting(req.body)
        if (result instanceof Error) return res.send(result)
        return res.send({success:true, message: `${req.body.userId}님의 새로운 글이 작성되었습니다.`})
    } catch (error) {
        debugger
    }
}

