const util = require("util")
const {dbConnection, schema} = require("../db/db");

// * 일단 유저, 제목 조회조건
// ! 유저 + 제목, 제목 + 내용, 등등 추후 고려
exports.getPostingsList = async({userId, title}) => {
    try {
        let condition;
        if(userId) condition = {userId};
        if(title) condition = {title};
        const conditionKey = Object.keys(condition).join();
        let queryStatement = `SELECT * FROM ${schema}.POSTING`;
        queryStatement = condition ? `${queryStatement} WHERE ${conditionKey.toUpperCase()} = ${condition[conditionKey]}` : queryStatement;        
        const response = await execAsync(queryStatement);
        if(response instanceof Error) return {error: response};
        return {data: response}
    } catch (error) {
        console.log(`srv_err : ${error.message} [getPostingList]`)
        return new Error(error.message)
    }
}

exports.writeNewPosting = async (body) => {
    try {
        const queryStatement = `INSERT INTO ${schema}.POSTING (USERID, TITLE, CONTENT) VALUES ('${body.userId}', '${body.title}', '${body.content}')`;
        const response = await execAsync(queryStatement);
        if(response instanceof Error) return response;
        return {success:true, message: "글쓰기 성공"}
    } catch (error) {
        console.log(`srv_err : ${error.message} [writeNewPosting]`)
        return new Error(error.message)
    }
}

const execAsync = async(sql) => {
    try {
        const preparePromise = util.promisify(dbConnection.prepare.bind(dbConnection));
        const statement = await preparePromise(sql);
        const executePromise =  getExecutePromise(statement);
        return executePromise([]);
        
    } catch (error) {
        console.log(`srv_err : ${error.message} [execAsync]`)
        return new Error(error.message)
    }
}

const getExecutePromise = (statement) => {
    return util.promisify(statement.exec.bind(statement))
}