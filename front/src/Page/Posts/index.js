import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Main from "./Main";
import PostingContent from "./PostingDetail";
import CreatePosting from "./CreatePosting";
import axios from "axios";
import Table from "../../Component/Table/Table";
import TableRow from "../../Component/Table/TableRow";
import TableColumn from "../../Component/Table/TableColumn";

function Posts(props) {

    const {history, match} = props;
    const [posting, setPosting] = useState([]);
    const [postingVisible, setPostingVisible] = useState(false);
  
    const getPosting = async() => {
      try {
        const response = await axios.get("http://localhost:3001/posting");
        setPosting(response.data.value);
        setPostingVisible(response.data.success);
        // return response.data.value
      } catch (error) {
        console.log(error)      
      }
    }

    useEffect( () => {
        getPosting();
        console.log("항상 포스팅 리스트에 접근해야할 것같아..")
      }, []);

      
    const onClickTableRow = (e) => {
        e.preventDefault();
        const postingId = e.currentTarget.querySelector("#postingId").innerText;
        console.log(`${match.url}${parseInt(postingId)}`)
        history.push(`${match.url}${parseInt(postingId)}`)
    };

    const onClickNewPosting = () => {
        console.log(`${match.url}new`)
        history.push("/posts/new")
    }

  return (
    postingVisible && <>
      <h1>Posts</h1>
      <Route exact path={match.path} posting={posting} >
        <button onClick={onClickNewPosting}>새 글쓰기</button>    
                        { 
                            postingVisible &&  <Table headerName={['글번호', '제목', '작성자']}  >
                            {
                                posting.map((post, index) => {
                                return (
                                    <TableRow key={index} id={`${index}`} onClick={onClickTableRow}>
                                        <TableColumn id='postingId'>{post.POSTINGID}</TableColumn>
                                        <TableColumn>{post.TITLE}</TableColumn>
                                        <TableColumn>{post.USERID}</TableColumn>
                                    </TableRow>
                                )
                                })
                            }
                            </Table> 
                        }      
      </Route>
      <Route exact path={`${match.path}/new`} component={CreatePosting} />
      <Route path={`${match.path}/:id`} component={PostingContent} posting={posting}/>
    </>
  );
}
export default Posts;