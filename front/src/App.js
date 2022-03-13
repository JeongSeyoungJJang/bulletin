import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Link, Route, Switch} from 'react-router-dom';
import NotFound from './Page/Posts/NotFound';
import { useHistory } from 'react-router-dom';
// import Main from './Page/Posts/Main';
import Posts from './Page/Posts';
import Users from './Page/Users';
export const postingContext = React.createContext(); //* 같은 값 공유하는 범위 생성


function App() {
  // const [thisVisible, setThisVisible] = useState(false);
  // const [inputData , setInputData] = useState("");
  const [posting, setPosting] = useState([]);
  const [postingVisible, setPostingVisible] = useState(false);
  const history = useHistory();

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
  /** 
   * * useEffect
   * * 1. 컴포넌트가 mount 되었을때
   * * 2. 컴포넌트가 update될때
   * * 특정코드 실행
   */
  useEffect( () => {
    // getPosting();
    console.log("App")
  }, []);

  // useEffect(() => {
  //   console.log("이거 보이냐?")
  //   let timer = setTimeout(()=> {
  //     setThisVisible(!thisVisible);
  //   }, 2000);
  //   return () => { clearTimeout(timer)}
  //   // return function aa() {} //! 사라질때 실행됨(unmount)
  //   // ? useEffect는 여러개 세팅가능하고 코드 순서대로 실행함
  // }, [thisVisible]);
  // * 빈칸이면 페이지가 로드될때 한번만 실행

  // useEffect(()=> {
  //   console.log("입력되고 있는중");
  
  // }, [inputData])
  const onClickHome = (e) => {
    history.push("/posts/")
  }

  return (
      <div className="App">
      
          <div className='black-nav' onClick={onClickHome}>
            게시판
          </div>
          {
          <Switch>

            {/* <postingContext.Provider value={posting}> */}
              <Route path="/posts" history={history} component={Posts} />
              <Route path="/users" component={Users}/>
              {/* <Route exact path="/posts/new" history={history} component={CreatePosting} />
              <Route exact path="/posts/:id" history={history} component={PostingContent} /> */}
                {/* <Main history={history}/>   */}
              {/* <Route path="/posts/:id(\d+)" >
                <PostingContent />  
              </Route>
              <Route path="/posts/new" component={CreatePosting} history={history}/>
              <Route exact path="/404-NotFound" component={NotFound}/> */}

            {/* </postingContext.Provider> */}
            <Route path="*" component={NotFound}/>
          </Switch>
        }
    </div>
      


      
  );
}

export default App;
