const util = require("util")
const {dbConnection, schema} = require("../db/db");
const {StringBuilder} = require("../common/common")
// * 일단 유저, 제목 조회조건
// ! 유저 + 제목, 제목 + 내용, 등등 추후 고려
exports.getPostingsList = async(body) => {
  try {
    let queryStatement = makeQueryStatement(body);
    const response = await execAsync(queryStatement);
    if(response instanceof Error) return {error: response};
    return {data: response}
  } catch (error) {
    console.log(`srv_err : ${error.message} [getPostingList]`)
    return new Error(error.message)
  }
}

exports.deletePosting = async body => {
  try {
    const queryStatement = `DELETE FROM ${schema}.POSTING WHERE POSTINGID = ${body.postingId}`
    const response = await execAsync(queryStatement);
    if(response instanceof Error) return response;
    return {success:true, message: "글삭제 성공"}
  } catch (error) {
    console.log(`srv_err : ${error.message} [deletePosting]`)
    return new Error(error.message)
  }
}

exports.modifyPosting = async (body) => {
  try {
    const queryStatement = `UPDATE ${schema}.POSTING SET TITLE = '${body.title}' , CONTENT = '${body.content}' WHERE POSTINGID = ${body.postingId}`
    const response = await execAsync(queryStatement);
    if(response instanceof Error) return response;
    return {success:true, message: "글수정 성공"}
  } catch (error) {
    console.log(`srv_err : ${error.message} [modifyPosting]`)
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

const makeQueryStatement = ({userId, title}) => {
  let stringBuilder = new StringBuilder();
  let condition;
  if(userId) condition = `WHERE USERID = '${userId}'`
  if(title) condition = `WHERE TITLE LIKE '%${title}%'`
  stringBuilder.append(`SELECT * FROM ${schema}.POSTING`);
  stringBuilder.spacer();
  stringBuilder.append(condition);
  return stringBuilder.getString();  
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

